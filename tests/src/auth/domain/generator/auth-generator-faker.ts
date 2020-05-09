import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { IEntityGenerator } from "@/../tests/utils/interfaces/i-entity-generator";
import faker from "faker";
import { v4 as uuidv4 } from "uuid";

export class AuthGeneratorFaker implements IEntityGenerator {
  private minPasswordLen: number = 9;
  private maxPasswordLen: number = 254;

  getInstance(): AuthObject {
    return {
      id: uuidv4(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(
        Math.random() * (this.maxPasswordLen - this.minPasswordLen) +
          this.minPasswordLen
      ),
    };
  }
}
