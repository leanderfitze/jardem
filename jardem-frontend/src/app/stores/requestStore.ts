import { makeAutoObservable, runInAction } from 'mobx'
import { RequestModel } from '../models/request'
import agent from '../api/agent'
import { v4 as uuid } from 'uuid'

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
          this.requestRegistry.set(req.id, req)
        })
      })
      this.loadingInitial = false
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
}
