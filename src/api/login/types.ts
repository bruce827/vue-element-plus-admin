export interface UserLoginType {
  username: string
  password: string
}

export interface UserType {
  username: string
  password: string
  role: string
  roleId: string
  permissions: string | string[]
  currentOrg?: string[] | number[]
  avatar?: string
  role?: string
}
