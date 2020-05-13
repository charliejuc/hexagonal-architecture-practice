import { AuthPasswordHashingRequired } from "../exceptions/auth-password-hashing-required";
import { AuthObject } from "../interfaces/auth-object";
import { ErrorsObject } from "../types/errors-object";
import { EmailValidator } from "../lib/email-validator";

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
  private minPasswordLength: number = 10;
  private maxPasswordLength: number = 200;
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
      this.validateField(authObj[field], field, type, errors, authObj);
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
    errors: ErrorsObject,
    authObject: AuthObject
  ) {
    const fieldUpperFirst = `${field[0].toUpperCase()}${field.slice(1)}`;
    const validateFieldMethod = `validate${fieldUpperFirst}`;

    this[validateFieldMethod]
      ? this[validateFieldMethod](value, field, type, errors, authObject)
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

    const hasErrors = Boolean(Object.keys(errors).length);

    if (hasErrors) {
      return;
    }

    if (!this.emailValidator.validate(value, field)) {
      const error = this.emailValidator.error();

      if (!error) {
        return;
      }

      errors[field] = error;
    }
  }

  private validatePassword(
    value: string,
    field: string,
    type: Function,
    errors: ErrorsObject,
    authObject: AuthObject
  ) {
    const plainPassword = authObject.plainPassword || "";

    const hasErrors = (): boolean => Boolean(Object.keys(errors).length);

    this.baseValidateField(plainPassword, field, type, errors);

    if (hasErrors()) {
      return;
    }

    this.baseValidateField(value, field, type, errors);

    if (hasErrors()) {
      return;
    }

    const plainPasswordLen = plainPassword ? plainPassword.length : 0;

    if (
      plainPasswordLen >= this.minPasswordLength &&
      plainPasswordLen <= this.maxPasswordLength
    ) {
      return;
    }

    const error = `"${field}" field should be more than ${this.minPasswordLength} characters long and less than ${this.maxPasswordLength}`;

    errors[field] = error;
  }
}
