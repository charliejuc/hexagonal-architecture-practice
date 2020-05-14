import { AuthPasswordHashingRequired } from '../exceptions/auth-password-hashing-required'
import { AuthObject } from '../interfaces/auth-object'
import { ErrorsObject } from '../interfaces/errors-object'
import { EmailValidator } from '../lib/email-validator'

export class AuthValidator {
  [key: string]: any;
  private _errors: null | ErrorsObject = null
  private readonly requiredFields: Array<[string, Function]> = [
    ['id', String],
    ['username', String],
    ['email', String],
    ['password', String]
  ]

  private readonly usernameRegexp: RegExp = /[^a-z^A-Z^0-9^.^_]/
  private readonly minPasswordLength: number = 10
  private readonly maxPasswordLength: number = 200
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  validate (authObj: AuthObject): boolean {
    if (authObj.password === authObj.plainPassword) {
      throw new AuthPasswordHashingRequired()
    }

    const errors: ErrorsObject = {}
    let isValid: boolean = true

    for (const [field, type] of this.requiredFields) {
      const error = this.validateField(authObj[field], field, type, authObj)

      if (error !== null) {
        isValid = false
        errors[field] = error
      }
    }

    if (!isValid) {
      this._errors = errors
    }

    return isValid
  }

  errors (): ErrorsObject | null {
    return this._errors
  }

  private baseValidateField (
    value: string,
    field: string,
    type: Function
  ): string | null {
    if (value === '' || value === null || value === undefined) {
      return `'${field}' is required`
    }

    if (typeof type() !== typeof value) {
      return `Invalid value '${value}' for '${field}' field`
    }

    return null
  }

  private validateField (
    value: string,
    field: string,
    type: Function,
    authObject: AuthObject
  ): string {
    const fieldUpperFirst = `${field[0].toUpperCase()}${field.slice(1)}`
    const validateFieldMethod = `validate${fieldUpperFirst}`

    return this[validateFieldMethod] !== undefined
      ? this[validateFieldMethod](value, field, type, authObject)
      : this.baseValidateField(value, field, type)
  }

  private validateUsername (
    value: string,
    field: string,
    type: Function
  ): string | null {
    let error: string | null = null
    error = this.baseValidateField(value, field, type)

    if (error !== null) {
      return error
    }

    if (typeof value === 'string' && value.search(this.usernameRegexp) !== -1) {
      error = `'${field}' contains invalid characters. Allowed characters: letters, numbers, _ and .`
    }

    return error
  }

  private validateEmail (
    value: string,
    field: string,
    type: Function
  ): string | null {
    let error: string | null = null
    error = this.baseValidateField(value, field, type)

    if (error !== null) {
      return error
    }

    if (!this.emailValidator.validate(value, field)) {
      return this.emailValidator.error()
    }

    return error
  }

  private validatePassword (
    value: string,
    field: string,
    type: Function,
    authObject: AuthObject
  ): string | null {
    const plainPassword = authObject.plainPassword ?? ''

    let error: string | null = null

    error = this.baseValidateField(plainPassword, field, type)

    if (error !== null) {
      return error
    }

    error = this.baseValidateField(value, field, type)

    if (error !== null) {
      return error
    }

    const plainPasswordLen = plainPassword !== '' ? plainPassword.length : 0

    if (
      plainPasswordLen >= this.minPasswordLength &&
      plainPasswordLen <= this.maxPasswordLength
    ) {
      return error
    }

    error = `"${field}" field should be more than ${this.minPasswordLength} characters long and less than ${this.maxPasswordLength}`

    return error
  }
}
