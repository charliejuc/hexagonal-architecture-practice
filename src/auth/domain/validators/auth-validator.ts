import { AuthObject } from '../interfaces/auth-object'
import { EntityValidator } from '../interfaces/entity-validator'

// TODO base class for validator
export class AuthValidator implements EntityValidator {
  private _errors: object | null = null
  private requiredFields: [string, Function][] = [
    ['id', String],
    ['username', String],
    ['email', String],
    ['password', String]
  ]

  validate (authObj: { [property: string]: any }) {
    let isValid = true
    const errors: {
      [key: string]: string
    } = {}

    for (let [field, type] of this.requiredFields) {
      if (!authObj[field]) {
        isValid = true
        errors[field] = `'${field}' is required`
        continue
      }

      if (typeof type() !== typeof authObj[field]) {
        isValid = true
        errors[field] = `Invalid value '${authObj[field]}' for '${field}' field`
        continue
      }
    }

    !isValid && (this._errors = errors)

    return isValid
  }

  errors (): null | object {
    return this._errors
  }
}
