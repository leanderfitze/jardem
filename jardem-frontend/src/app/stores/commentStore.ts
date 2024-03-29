import { makeAutoObservable, runInAction } from 'mobx'
import { ChatComment } from '../models/chatComment'
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { store } from './store'

export default class CommentStore {
  comments: ChatComment[] = []
  hubConnection: HubConnection | null = null

  constructor() {
    makeAutoObservable(this)
  }

  createHubConnection = (requestId: string) => {
    if (store.requestStore.selectedRequest) {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:5000/chat?requestId=' + requestId, {
          accessTokenFactory: () => store.userStore.user?.token!,
        })
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Trace)
        .build()

      this.hubConnection
        .start()
        .then(() => {
          this.hubConnection!.on('LoadComments', (comments: ChatComment[]) => {
            runInAction(() => {
              comments.forEach((comment) => {
                comment.createdAt = new Date(comment.createdAt + 'Z')
              })
              this.comments = comments
            })
          })

          this.hubConnection!.on('ReceiveComment', (comment: ChatComment) => {
            runInAction(() => {
              comment.createdAt = new Date(comment.createdAt)
              this.comments.unshift(comment)
            })
          })
        })
        .catch((error) => console.log(`Error establishing connection: ${error}`))
    }
  }

  stopHubConnection = () => {
    this.hubConnection?.stop().catch((error) => console.log(`Error stopping connection: ${error}`))
  }

  clearComments = () => {
    this.comments = []
    this.stopHubConnection()
  }

  addComments = async (values: any) => {
    values.requestId = store.requestStore.selectedRequest?.id
    try {
      await this.hubConnection?.invoke('SendComment', values)
    } catch (error) {
      console.log(error)
    }
  }
}
