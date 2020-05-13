import { validate as emailValidate } from 'isemail'

export class EmailValidator {
  private _error: null | string = null

  public validate (email: string, field: string): boolean {
    const isValidEmail = emailValidate(email)

    if (!isValidEmail) {
      this._error = `"${field}" field has invalid email format (${email})`
    }

    return isValidEmail
  }

  public error (): null | string {
    return this._error
  }
}
