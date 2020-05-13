export interface AuthObject {
  [key: string]: any
  id: string
  username: string
  email: string
  password: string
  plainPassword?: string
}
