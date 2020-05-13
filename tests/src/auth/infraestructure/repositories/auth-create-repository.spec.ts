import { Auth } from "@/auth/domain/auth";
import { AuthObject } from "@/auth/domain/interfaces/auth-object";
import { ErrorsObject } from "@/auth/domain/types/errors-object";
import { AuthMock } from "../../domain/auth-mock";

const createRepository = AuthMock.AuthCreateRepository();
const authGenerator = AuthMock.AuthGenerator();

describe("should create auth entry successfully", () => {
  const authObj = authGenerator.getInstance();

  let err: null | Error = null;
  let authInstance: Auth | ErrorsObject | null = null;
  let authInstanceJSON: AuthObject;
  beforeAll(async () => {
    try {
      authInstance = await createRepository.create(authObj);
    } catch (e) {
      err = e;
    }

    // @ts-ignore
    authInstanceJSON = authInstance.toJSON();
  });

  test("should not throw an exception", () => {
    expect(err).toBeFalsy();
  });

  test("should have valid Auth instance", () => {
    expect(authInstance).toBeTruthy();
    expect(authInstance).toBeInstanceOf(Auth);
  });

  test("should have correct JSON field values", () => {
    expect(authInstanceJSON.id).toBe(authObj.id);
    expect(authInstanceJSON.username).toBe(authObj.username);
    expect(authInstanceJSON.email).toBe(authObj.email);
    expect(authInstanceJSON.password).not.toBe(authObj.password);
    expect(typeof authInstanceJSON.password).toBe("string");
  });
});

describe("should fail creating auth entry", () => {
  const authObj = {};

  let err: null | Error = null;
  let authInstance: Auth | ErrorsObject | null = null;
  let errorsObj: ErrorsObject | Auth | null;
  beforeAll(async () => {
    try {
      // @ts-ignore
      authInstance = await createRepository.create(authObj);
    } catch (e) {
      err = e;
    }

    errorsObj = authInstance;

    if (authInstance && authInstance.toJSON) {
      // @ts-ignore
      errorsObj = authInstance.toJSON();
    }
  });

  test("should not throw an exception", () => {
    expect(err).toBeFalsy();
  });

  test("should have errors", () => {
    expect(errorsObj).toBeTruthy();
    // @ts-ignore
    expect(errorsObj.contructor).toBe({}.contructor);
    // @ts-ignore
    expect(Object.keys(errorsObj).length).toBeTruthy();
  });
});
