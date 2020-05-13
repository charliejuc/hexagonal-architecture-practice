import { Auth } from '../../auth'
import { AuthObject } from '../auth-object'
import { ErrorsObject } from '../../types/errors-object'

export interface AuthCreateRepository {
  create(autoObj: AuthObject): Promise<Auth | ErrorsObject>
}
