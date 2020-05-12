import { EmailValidator } from "@/auth/infraestructure/auth/lib/email-validator";
import { AuthPasswordHashingRequired } from "../exceptions/auth-password-hashing-required";
import { AuthObject } from "../interfaces/auth-object";
import { ErrorsObject } from "../types/errors-object";

export class AuthValidator {
  [key: string]: any;
  private _errors: null | ErrorsObject = null;
  private requiredFields: [string, Function][] = [
    ["id", String],
    ["username", String],
    ["email", String],
    ["password", String],
  ];
  private usernameRegexp: RegExp = /[^a-z^A-Z^0-9^\.^_]/;
  private emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  validate(authObj: AuthObject) {
    if (authObj.password === authObj.plainPassword) {
      throw new AuthPasswordHashingRequired();
    }

    const errors: ErrorsObject = {};

    for (let [field, type] of this.requiredFields) {
      this.validateField(authObj[field], field, type, errors);
    }

    const isValid = !Boolean(Object.keys(errors).length);

    !isValid && (this._errors = errors);

    return isValid;
  }

  errors() {
    return this._errors;
  }

  private baseValidateField(
    value: string,
    field: string,
    type: Function,
    errors: ErrorsObject
  ) {
    if (!value) {
      errors[field] = `'${field}' is required`;
      return;
    }

    if (typeof type() !== typeof value) {
      errors[field] = `Invalid value '${value}' for '${field}' field`;
      return;
    }
  }

  private validateField(
    value: string,
    field: string,
    type: Function,
    errors: ErrorsObject
  ) {
    const fieldUpperFirst = `${field[0].toUpperCase()}${field.slice(1)}`;
    const validateFieldMethod = `validate${fieldUpperFirst}`;

    this[validateFieldMethod]
      ? this[validateFieldMethod](value, field, type, errors)
      : this.baseValidateField(value, field, type, errors);
  }

  private validateUsername(
    value: string,
    field: string,
    type: Function,
    errors: ErrorsObject
  ) {
    this.baseValidateField(value, field, type, errors);

    if (typeof value === "string" && value.search(this.usernameRegexp) !== -1) {
      errors[
        field
      ] = `'${field}' contains invalid characters. Allowed characters: letters, numbers, _ and .`;
    }
  }

  private validateEmail(
    value: string,
    field: string,
    type: Function,
    errors: ErrorsObject
  ) {
    this.baseValidateField(value, field, type, errors);

    const hasErrors = ! Object.keys(errors).length

    if ( hasErrors && ! this.emailValidator.validate(value, field) ) {
      const error = this.emailValidator.error()

      if ( ! error ) {
        return
      }

      errors[
        field
      ] = error;
    }
  }
}
