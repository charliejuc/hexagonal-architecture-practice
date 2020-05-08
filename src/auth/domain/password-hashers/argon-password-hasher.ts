import argon2 from 'argon2'
import { PasswordHasher } from '../interfaces/password-hasher'

export class ArgonPaswordHasher implements PasswordHasher {
  hash (password: string) {
    return argon2.hash(password)
  }
}
