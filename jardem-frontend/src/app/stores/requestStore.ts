import { makeAutoObservable, runInAction } from 'mobx'
import { RequestModel } from '../models/request'
import agent from '../api/agent'
import { v4 as uuid } from 'uuid'
import { store } from './store'
import { Profile } from '../models/profile'

export default class RequestStore {
  requestRegistry = new Map<string, RequestModel>()
  selectedRequest: RequestModel | undefined
  editMode: boolean = false
  loadingInitial: boolean = false
  submitting: boolean = false
  deleting: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  loadRequests = async () => {
    this.loadingInitial = true
    try {
      const requests = await agent.Requests.list()
      runInAction(() => {
        requests.forEach((req) => {
          req.requester = req.participants!.find((x) => x.userName === req.requesterUserName)
          this.requestRegistry.set(req.id, req)
        })
        this.loadingInitial = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loadingInitial = false
      })
    }
  }

  get requestsByDate() {
    return Array.from(this.requestRegistry.values()).sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    )
  }

  get groupedRequests() {
    return Object.entries(
      this.requestsByDate.reduce((requests, request) => {
        const date = request.date.split('T')[0]
        requests[date] = requests[date] ? [...requests[date], request] : [request]
        return requests
      }, {} as { [key: string]: RequestModel[] })
    )
  }

  loadRequest = async (id: string) => {
    let request = this.getRequest(id)
    if (request) {
      this.selectedRequest = request
      return request
    } else {
      this.loadingInitial = true
      try {
        request = await agent.Requests.details(id)
        runInAction(() => {
          this.selectedRequest = request
          this.loadingInitial = false
        })
        return request
      } catch (error) {
        console.log(error)
        runInAction(() => {
          this.loadingInitial = false
        })
      }
    }
  }

  private getRequest = (id: string) => {
    return this.requestRegistry.get(id)
  }

  selectRequest = (id: string) => {
    this.selectedRequest = this.requestRegistry.get(id)
  }

  cancelSelectedRequest = () => {
    this.editMode = false
    this.selectedRequest = undefined
  }

  openForm = (id?: string) => {
    id ? this.selectRequest(id) : this.cancelSelectedRequest()
    this.editMode = true
  }

  closeForm = () => {
    this.editMode = false
  }

  createRequest = async (request: RequestModel) => {
    this.submitting = true
    request.id = uuid()
    request.date = new Date().toISOString()
    try {
      await agent.Requests.create(request)
      runInAction(() => {
        this.requestRegistry.set(request.id, request)
        this.selectedRequest = request
        this.closeForm()
        this.submitting = false
      })
      return request.id
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.submitting = false
      })
    }
  }

  updateRequest = async (request: RequestModel) => {
    this.submitting = true
    try {
      await agent.Requests.update(request)
      runInAction(() => {
        this.requestRegistry.set(request.id, request)
        this.selectedRequest = request
        this.closeForm()
        this.submitting = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.submitting = false
      })
    }
  }

  deleteRequest = async (id: string) => {
    this.deleting = true
    try {
      await agent.Requests.delete(id)
      runInAction(() => {
        if (id === this.selectedRequest?.id) this.selectedRequest = undefined
        this.requestRegistry.delete(id)
        this.closeForm()
        this.deleting = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.deleting = false
      })
    }
  }

  participate = async () => {
    try {
      await agent.Requests.participate(this.selectedRequest!.id)
      runInAction(() => {
        const user = store.userStore.user
        if (this.selectedRequest?.participants?.some((x) => x.userName === user?.userName)) {
          this.selectedRequest?.participants?.filter((x) => x.userName !== user?.userName)
        } else {
          const participant = new Profile(user!)
          this.selectedRequest!.participants?.push(participant)
        }

        this.requestRegistry.set(this.selectedRequest!.id, this.selectedRequest!)
      })
    } catch (error) {
      console.log(error)
    }
  }

  resolve = async () => {
    try {
      await agent.Requests.participate(this.selectedRequest!.id)
      runInAction(() => {
        this.selectedRequest!.resolved = !this.selectedRequest!.resolved
      })
    } catch (error) {
      console.log(error)
    }
  }

  clearSelectedRequest = () => {
    this.selectedRequest = undefined
  }
}
