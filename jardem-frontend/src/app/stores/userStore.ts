import { makeAutoObservable, runInAction } from 'mobx'
import { User, UserFormValues } from '../models/user'
import agent from '../api/agent'
import { store } from './store'
import { router } from '../router/routes'

export default class UserStore {
  user: User | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get isLoggedIn() {
    return !!this.user
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds)
      store.commonStore.setToken(user.token)
      runInAction(() => {
        this.user = user
      })
      store.modalStore.closeModal()
      router.navigate('/requests')
    } catch (error) {
      throw error
    }
  }

  logout = () => {
    store.commonStore.setToken(null)
    this.user = null
    router.navigate('/')
    store.requestStore.requestRegistry.clear()
  }

  getUser = async () => {
    try {
      const user = await agent.Account.current()
      runInAction(() => {
        this.user = user
      })
    } catch (error) {
      console.log(error)
    }
  }

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds)
      store.commonStore.setToken(user.token)
      runInAction(() => {
        this.user = user
      })
      store.modalStore.closeModal()
      router.navigate('/requests')
    } catch (error) {
      throw error
    }
  }

  setImage = (image: string) => {
    if (this.user) this.user.image = image
  }
}
