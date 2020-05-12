import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { IEntityGenerator } from "@/../tests/utils/interfaces/i-entity-generator";
import faker from "faker";
import { v4 as uuidv4 } from "uuid";
import { AuthMock } from "../auth-mock";

export class AuthGeneratorFaker implements IEntityGenerator {
  private minPasswordLength: number = AuthMock.minPasswordLength;
  private maxPasswordLength: number = AuthMock.maxPasswordLength;

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
