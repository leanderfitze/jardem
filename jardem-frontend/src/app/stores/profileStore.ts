import { makeAutoObservable, runInAction } from 'mobx'
import { Profile } from '../models/profile'
import agent from '../api/agent'
import { store } from './store'

export default class ProfileStore {
  profile: Profile | null = null
  loading: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  get isCurrentUser() {
    if (store.userStore.user && this.profile) {
      return store.userStore.user.userName === this.profile.userName
    }
    return false
  }

  loadProfile = async (userName: string) => {
    this.loading = true
    try {
      const profile = await agent.Profiles.get(userName)
      runInAction(() => {
        this.profile = profile
        this.loading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
