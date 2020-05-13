import { Auth } from "@/layered-apps/auth/domain/auth";
import { AuthObject } from "@/layered-apps/auth/domain/interfaces/auth-object";
import { EmailValidator } from "@/layered-apps/auth/domain/lib/email-validator";
import { ArgonPaswordHasher as PaswordHasher } from "@/layered-apps/auth/domain/lib/password-hashers/argon-password-hasher";
import { ArgonPaswordVerifier as PaswordVerifier } from "@/layered-apps/auth/domain/lib/password-hashers/argon-password-verifier";
import { AuthCreateMemoryRepository } from "@/layered-apps/auth/domain/repositories/auth-create-memory-repository";
import { AuthValidator } from "@/layered-apps/auth/domain/validators/auth-validator";
import { AuthGeneratorFaker as AuthGenerator } from "./generator/auth-generator-faker";

export class AuthMockDomain {
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
