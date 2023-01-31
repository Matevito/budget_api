export interface UserFull {
  id: string
  username: string
  password: string
  email: string
  description: string
  admin: boolean
}

export type UserSecure = Omit<UserFull, 'password'>
