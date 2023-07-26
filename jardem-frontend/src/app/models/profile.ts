import { User, UserType } from './user'

export interface Profile {
  userName: string
  displayName: string
  userType: UserType
  image?: string
}

export class Profile implements Profile {
  constructor(user: User) {
    this.userName = user.userName
    this.displayName = user.displayName
    this.userType = user.userType
    this.image = user.image
  }
}
