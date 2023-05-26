import { createContext, useContext } from 'react'
import RequestStore from './requestStore'

interface Store {
  requestStore: RequestStore
}

export const store: Store = {
    requestStore: new RequestStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}