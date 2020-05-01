import { IEntityGenerator } from '@/tests/utils/interfaces/i-entity-generator'
import faker from 'faker'
import { v4 as uuidv4 } from 'uuid'

export class AuthGeneratorFaker implements IEntityGenerator {
  getInstance (): Object {
    return {
      id: uuidv4(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(11)
    }
  }
}
