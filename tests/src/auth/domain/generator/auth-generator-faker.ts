import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { IEntityGenerator } from "@/../tests/utils/interfaces/i-entity-generator";
import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { AuthMockDomain } from "../auth-mock-domain";

export class AuthGeneratorFaker implements IEntityGenerator {
  private minPasswordLength: number = AuthMockDomain.minPasswordLength;
  private maxPasswordLength: number = AuthMockDomain.maxPasswordLength;

  getInstance(): AuthObject {
    return {
      id: uuidv4(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(
        Math.random() * (this.maxPasswordLength - this.minPasswordLength) +
          this.minPasswordLength
      ),
    };
  }
}
