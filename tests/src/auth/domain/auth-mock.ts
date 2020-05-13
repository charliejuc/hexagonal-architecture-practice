import { Auth } from "@/auth/domain/auth";
import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { EmailValidator } from "@/auth/domain/lib/email-validator";
import { ArgonPaswordHasher as PaswordHasher } from "@/auth/domain/lib/password-hashers/argon-password-hasher";
import { ArgonPaswordVerifier as PaswordVerifier } from "@/auth/domain/lib/password-hashers/argon-password-verifier";
import { AuthCreateMemoryRepository } from "@/auth/domain/repositories/auth-create-memory-repository";
import { AuthValidator } from "@/auth/domain/validators/auth-validator";
import { AuthGeneratorFaker as AuthGenerator } from "./generator/auth-generator-faker";

export class AuthMock {
  public static authFields: string[] = ["id", "username", "email", "password"];
  public static minPasswordLength: number = 10;
  public static maxPasswordLength: number = 200;

  public static Auth(authObjInstance: AuthObject) {
    return new Auth(
      authObjInstance,
      this.PasswordHasher(),
      this.AuthValidator()
    );
  }

  public static AuthCreateRepository() {
    return new AuthCreateMemoryRepository();
  }

  public static AuthGenerator() {
    return new AuthGenerator();
  }

  public static PasswordHasher() {
    return new PaswordHasher();
  }

  public static PasswordVerifier() {
    return new PaswordVerifier();
  }

  public static AuthValidator() {
    const emailValidator = new EmailValidator();

    return new AuthValidator(emailValidator);
  }
}
