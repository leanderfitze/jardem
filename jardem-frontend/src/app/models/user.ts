export interface User {
  username: string
  displayName: string
  token: string
  userType: UserType
  image?: string
}

export interface UserFormValues {
  email: string
  password: string
  userType?: UserType
  displayName?: string
  userName?: string
}

export enum UserType {
  Requester = 'Requester',
  Volunteer = 'Volunteer',
}
