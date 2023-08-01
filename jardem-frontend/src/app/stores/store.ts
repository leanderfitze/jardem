import { createContext, useContext } from 'react'
import RequestStore from './requestStore'
import CommonStore from './commonStore'
import UserStore from './userStore'
import ModalStore from './modalStore'
import ProfileStore from './profileStore'

interface Store {
  requestStore: RequestStore
  commonStore: CommonStore
  userStore: UserStore
  modalStore: ModalStore
  profileStore: ProfileStore
}

export const store: Store = {
    requestStore: new RequestStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}