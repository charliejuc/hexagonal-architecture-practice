import { validate as emailValidate } from "isemail";

export class EmailValidator {
  private _error: null | string = null;

  public validate(email: string, field: string) {
    const isValidEmail = emailValidate(email);

    if (!isValidEmail) {
      this._error = `"${field}" field has invalid email format (${email})`;
    }

    return isValidEmail;
  }

  public error() {
    return this._error;
  }
}
