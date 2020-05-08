import argon2 from 'argon2'
import { PasswordVerifier } from '../interfaces/password-verifier'

export class ArgonPaswordVerifier implements PasswordVerifier {
  verify (hash: string, password: string) {
    return argon2.verify(hash, password)
  }
}
