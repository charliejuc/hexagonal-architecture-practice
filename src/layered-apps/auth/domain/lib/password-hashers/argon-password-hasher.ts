import argon2 from 'argon2'
import { PasswordHasher } from '../../interfaces/password-hasher'

export class ArgonPaswordHasher implements PasswordHasher {
  async hash (password: string): Promise<string> {
    return await argon2.hash(password)
  }
}
