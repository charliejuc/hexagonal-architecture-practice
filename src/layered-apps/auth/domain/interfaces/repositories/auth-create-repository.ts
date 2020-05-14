import { Auth } from '../../auth'
import { AuthObject } from '../auth-object'
import { ErrorsResponse } from '../errors-response'

export interface AuthCreateRepository {
  create(autoObj: AuthObject): Promise<Auth | ErrorsResponse>
}
