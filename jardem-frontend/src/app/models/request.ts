import Profile from "./profile"

export interface RequestModel {
    id: string
    title: string
    date: string
    details: string
    requesterUserName?: string
    resolved?: boolean
    participants?: Profile[]
  }
  