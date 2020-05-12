import { PropertyValidator } from "@/auth/domain/interfaces/property-validator";
import { validate as emailValidate } from "isemail";

export class EmailValidator implements PropertyValidator {
  private _error: null | string = null;

  public validate(email: string, field: string) {
    const isValidEmail = emailValidate(email);

    if ( ! isValidEmail ) {
        this._error = `"${field}" field has invalid email format (${email})`
    }

    return isValidEmail
  }

  public error() {
    return this._error;
  }
}
