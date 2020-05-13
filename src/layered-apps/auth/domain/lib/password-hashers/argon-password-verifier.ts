import argon2 from 'argon2'
import { PasswordVerifier } from '../../interfaces/password-verifier'

export class ArgonPaswordVerifier implements PasswordVerifier {
  async verify (hash: string, password: string): Promise<boolean> {
    return await argon2.verify(hash, password)
  }
}
