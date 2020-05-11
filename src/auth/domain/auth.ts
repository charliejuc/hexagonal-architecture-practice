import { AuthObject } from "./interfaces/auth-object";
import { PasswordHasher } from "./interfaces/password-hasher";
import { AuthValidator } from "./validators/auth-validator";

export class Auth {
  private _username: string;
  private _id: string;
  private _email: string;
  private _password: string = "";
  private passwordHasher: PasswordHasher;
  private validator: AuthValidator;
  private _plainPassword: string = "";

  constructor(
    authObj: AuthObject,
    passwordHasher: PasswordHasher,
    validator: AuthValidator
  ) {
    this.passwordHasher = passwordHasher;
    this.validator = validator;

    this._id = authObj.id;
    this._username = authObj.username;
    this._email = authObj.email;
    this.password = authObj.password;
  }

  public async hashPassword() {
    this._password = await this.passwordHasher.hash(this._password);
  }

  public validate() {
    const jsonObj = this.toJSON();

    jsonObj.plainPassword = this._plainPassword;

    return this.validator.validate(jsonObj);
  }

  public errors() {
    return this.validator.errors();
  }

  public toJSON(): AuthObject {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }

  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    this._email = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._plainPassword = value;
    this._password = value;
  }
}
