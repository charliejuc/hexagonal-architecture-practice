import { Auth } from "@/auth/domain/auth";
import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { AuthCreateRepository } from "@/auth/domain/interfaces/repositories/auth-create-repository";
import { ArgonPaswordHasher } from "@/auth/domain/lib/password-hashers/argon-password-hasher";
import { AuthValidator } from "@/auth/domain/validators/auth-validator";
import { EmailValidator } from "../lib/email-validator";
import { memoryDatabase } from "./memory-db";

const argonPasswordHashed = new ArgonPaswordHasher();
const authValidator = new AuthValidator(new EmailValidator());

export class AuthCreateMemoryRepository implements AuthCreateRepository {
  async create(authObj: AuthObject) {
    const authInstance = new Auth(authObj, argonPasswordHashed, authValidator);

    let isValid: boolean = false;
    try {
      await authInstance.hashPassword();

      isValid = authInstance.validate();
    } catch (err) {
      return {
        password: 'Invalid "password" field',
      };
    }

    const errors = authInstance.errors();

    if (!isValid && errors) {
      return errors;
    }

    memoryDatabase.push(authInstance.toJSON());

    return authInstance;
  }
}
