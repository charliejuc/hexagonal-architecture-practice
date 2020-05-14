import { AuthObject } from '@/layered-apps/auth/domain/interfaces/auth-object'
import { AuthCreateRepository } from '@/layered-apps/auth/domain/interfaces/repositories/auth-create-repository'
import { Auth } from '../../domain/auth'
import { ErrorsResponse } from '../../domain/interfaces/errors-response'

export class AuthCreateService {
  private readonly createRepository: AuthCreateRepository

  constructor (createRepository: AuthCreateRepository) {
    this.createRepository = createRepository
  }

  async create (authObj: AuthObject): Promise<Auth | ErrorsResponse> {
    try {
      return await this.createRepository.create(authObj)
    } catch (err) {
      return {
        errors: {
          unexpectedError: 'An error occurred, please try again later'
        }
      }
    }
  }
}
