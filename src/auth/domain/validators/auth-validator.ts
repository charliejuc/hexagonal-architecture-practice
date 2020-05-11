import { AuthObject } from "../interfaces/auth-object";
import { AuthPasswordHashingRequired } from "../exceptions/auth-password-hashing-required";

export class AuthValidator {
  private _errors: null | { [key: string]: string } = null;
  private requiredFields: [string, Function][] = [
    ["id", String],
    ["username", String],
    ["email", String],
    ["password", String],
  ];

  validate(authObj: AuthObject) {
    if (authObj.password === authObj.plainPassword) {
      throw new AuthPasswordHashingRequired();
    }

    let isValid = true;
    const errors: {
      [key: string]: string;
    } = {};

    for (let [field, type] of this.requiredFields) {
      if (!authObj[field]) {
        isValid = false;
        errors[field] = `'${field}' is required`;
        continue;
      }

      if (typeof type() !== typeof authObj[field]) {
        isValid = false;
        errors[
          field
        ] = `Invalid value '${authObj[field]}' for '${field}' field`;
        continue;
      }
    }

    !isValid && (this._errors = errors);

    return isValid;
  }

  errors() {
    return this._errors;
  }
}
