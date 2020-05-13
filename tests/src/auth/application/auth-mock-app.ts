import { AuthCreateService } from "@/auth/application/service/auth-create-service";
import { AuthMockDomain } from "../domain/auth-mock-domain";

export class AuthMockApp {
  public static AuthCreateService() {
    return new AuthCreateService(AuthMockDomain.AuthCreateRepository());
  }
}