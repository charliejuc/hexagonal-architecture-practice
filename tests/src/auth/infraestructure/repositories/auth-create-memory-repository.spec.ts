import { Auth } from "@/auth/domain/auth";
import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { ErrorsObject } from "@/auth/domain/types/errors-object";
import { AuthCreateMemoryRepository } from "@/auth/infraestructure/repositories/auth-create-memory-repository";
import { AuthGeneratorFaker as AuthGenerator } from "../../domain/generator/auth-generator-faker";

const createMemoryRepository = new AuthCreateMemoryRepository();
const authGenerator = new AuthGenerator();

test("should create auth entry successfully", async () => {
  const authObj = authGenerator.getInstance();

  let err: null | Error = null;
  let authInstance: Auth | ErrorsObject | null = null;
  try {
    authInstance = await createMemoryRepository.create(authObj);
  } catch (e) {
    err = e;
  }

  expect(authInstance).toBeTruthy();
  expect(err).toBeFalsy();
  expect(authInstance).toBeInstanceOf(Auth);

  // @ts-ignore
  const authInstanceJSON: AuthObject = authInstance.toJSON();

  expect(authInstanceJSON.id).toBe(authObj.id);
  expect(authInstanceJSON.username).toBe(authObj.username);
  expect(authInstanceJSON.email).toBe(authObj.email);
  expect(authInstanceJSON.password).not.toBe(authObj.password);
});
