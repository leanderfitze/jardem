import { UserType } from './user'

export default interface Profile {
  userName: string
  displayName: string
  userType: UserType
  image?: string
}
