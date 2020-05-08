export interface PasswordVerifier {
  verify(hash: string, password: string): Promise<boolean>
}
