import { Auth } from '@/layered-apps/auth/domain/auth'
import { AuthObject } from '@/layered-apps/auth/domain/interfaces/auth-object'
import { AuthCreateRepository } from '@/layered-apps/auth/domain/interfaces/repositories/auth-create-repository'
import { ArgonPaswordHasher } from '@/layered-apps/auth/domain/lib/password-hashers/argon-password-hasher'
import { AuthValidator } from '@/layered-apps/auth/domain/validators/auth-validator'
import { ErrorsResponse } from '../interfaces/errors-response'
import { EmailValidator } from '../lib/email-validator'
import { memoryDatabase } from './memory-db'

const argonPasswordHashed = new ArgonPaswordHasher()
const authValidator = new AuthValidator(new EmailValidator())

export class AuthCreateMemoryRepository implements AuthCreateRepository {
  async create (authObj: AuthObject): Promise<Auth | ErrorsResponse> {
    const authInstance = new Auth(authObj, argonPasswordHashed, authValidator)

    let isValid: boolean = false
    try {
      await authInstance.hashPassword()

      isValid = authInstance.validate()
    } catch (err) {
      return {
        errors: {
          password: 'Invalid "password" field'
        }
      }
    }

    const errors = authInstance.errors()

    if (!isValid && errors !== null) {
      return {
        errors
      }
    }

    memoryDatabase.push(authInstance.toJSON())

    return authInstance
  }
}
