export class AuthPasswordHashingRequired extends Error {
  public message =
    "'hashPassword()' method should be executed before calling 'validate()'";
  public code = "AUTH_PASSWORD_HASHING_REQUIRED";
}
