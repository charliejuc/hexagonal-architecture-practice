import { ErrorsObject } from './errors-object'

export interface ErrorsResponse {
  [key: string]: any
  errors: ErrorsObject
}
