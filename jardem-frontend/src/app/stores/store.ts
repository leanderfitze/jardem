import { createContext, useContext } from 'react'
import RequestStore from './requestStore'
import CommonStore from './commonStore'

interface Store {
  requestStore: RequestStore
  commonStore: CommonStore
}

export const store: Store = {
    requestStore: new RequestStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}