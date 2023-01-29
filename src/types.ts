export interface UserFull {
  id: string
  username: string
  password: String
  email: string
  description: string
  admin: boolean
}

export type UserSecure = Omit<UserFull, 'password'>
