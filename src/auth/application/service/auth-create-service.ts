import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { AuthCreateRepository } from "@/auth/domain/interfaces/repositories/auth-create-repository";

export class AuthCreateService {
  private createRepository: AuthCreateRepository;

  constructor(createRepository: AuthCreateRepository) {
    this.createRepository = createRepository;
  }

  async create(authObj: AuthObject) {
    try {
      return await this.createRepository.create(authObj);
    } catch (err) {
      return {
        unexpectedError: "An error occurred, please try again later",
      };
    }
  }
}
