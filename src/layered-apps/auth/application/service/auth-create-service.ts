import { AuthObject } from '@/layered-apps/auth/domain/interfaces/auth-object'
import { AuthCreateRepository } from '@/layered-apps/auth/domain/interfaces/repositories/auth-create-repository'
import { Auth } from '../../domain/auth'
import { ErrorsObject } from '../../domain/types/errors-object'

export class AuthCreateService {
  private readonly createRepository: AuthCreateRepository

  constructor (createRepository: AuthCreateRepository) {
    this.createRepository = createRepository
  }

  async create (authObj: AuthObject): Promise<Auth | ErrorsObject> {
    try {
      return await this.createRepository.create(authObj)
    } catch (err) {
      return {
        unexpectedError: 'An error occurred, please try again later'
      }
    }
  }
}
