import { createContext, useContext } from 'react'
import RequestStore from './requestStore'
import CommonStore from './commonStore'
import UserStore from './userStore'
import ModalStore from './modalStore'

interface Store {
  requestStore: RequestStore
  commonStore: CommonStore
  userStore: UserStore
  modalStore: ModalStore
}

export const store: Store = {
    requestStore: new RequestStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}