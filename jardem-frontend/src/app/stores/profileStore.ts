import { makeAutoObservable, runInAction } from 'mobx'
import { Profile } from '../models/profile'
import agent from '../api/agent'
import { store } from './store'

export default class ProfileStore {
  profile: Profile | null = null
  loading: boolean = false
  uploading: boolean = false
  settingMainPhoto: boolean = false
  deletingPhoto: boolean = false

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

  uploadPhoto = async (blob: Blob) => {
    this.uploading = true
    try {
      const response = await agent.Profiles.uploadPhoto(blob)
      const photo = response.data
      runInAction(() => {
        if (this.profile) {
          this.profile.photos?.push(photo)
          if (!this.profile.image) {
            store.userStore.setImage(photo.url)
            this.profile.image = photo.url
          }
        }
        this.uploading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => (this.uploading = false))
    }
  }

  setMainPhoto = async (id: string) => {
    this.settingMainPhoto = true
    try {
      await agent.Profiles.setMainPhoto(id)
      const image = this.profile!.photos!.find((x) => x.id === id)!.url
      store.userStore.setImage(image)
      runInAction(() => {
        if (this.profile && this.profile.photos) {
          this.profile.image = image
        }
        this.settingMainPhoto = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => (this.settingMainPhoto = false))
    }
  }

  deletePhoto = async (id: string) => {
    this.deletingPhoto = true
    try {
      await agent.Profiles.deletePhoto(id)
      runInAction(() => {
        if (this.profile && this.profile.photos) this.profile.photos.filter((p) => p.id !== id)
        this.deletingPhoto = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.deletingPhoto = false
      })
    }
  }
}
