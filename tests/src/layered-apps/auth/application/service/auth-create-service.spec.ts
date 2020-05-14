import { Auth } from "@/layered-apps/auth/domain/auth";
import { AuthObject } from "@/layered-apps/auth/domain/interfaces/auth-object";
import { ErrorsObject } from "@/layered-apps/auth/domain/interfaces/errors-object";
import { AuthMockDomain } from "../../domain/auth-mock-domain";
import { AuthMockApp } from "../auth-mock-app";

const authGenerator = AuthMockDomain.AuthGenerator();
const authCreateService = AuthMockApp.AuthCreateService();

describe("should create auth entry successfully", () => {
  const authObj = authGenerator.getInstance();

  let authInstance: Auth | ErrorsObject | null = null;
  let authInstanceJSON: AuthObject;
  beforeAll(async () => {
    authInstance = await authCreateService.create(authObj);

    // @ts-ignore
    authInstanceJSON = authInstance.toJSON();
  });

  test("should have valid Auth instance", () => {
    expect(authInstance).toBeTruthy();
    expect(authInstance).toBeInstanceOf(Auth);
  });

  test("should not throw an exception", () => {
    // @ts-ignore
    expect(authInstance.unexpectedError).toBeFalsy();
  });

  test("should have correct JSON field values", () => {
    expect(authInstanceJSON.id).toBe(authObj.id);
    expect(authInstanceJSON.username).toBe(authObj.username);
    expect(authInstanceJSON.email).toBe(authObj.email);
    expect(authInstanceJSON.password).not.toBe(authObj.password);
    expect(typeof authInstanceJSON.password).toBe("string");
  });
});

describe("should fail creating auth entry - empty object", () => {
  const authObj = {};

  let authInstance: Auth | ErrorsObject | null = null;
  let errorsObj: ErrorsObject | Auth | null;
  beforeAll(async () => {
    // @ts-ignore
    authInstance = await authCreateService.create(authObj);

    errorsObj = authInstance;

    if (authInstance && authInstance.toJSON) {
      // @ts-ignore
      errorsObj = authInstance.toJSON();
    }
  });

  test("should not throw an exception", () => {
    // @ts-ignore
    expect(authInstance.unexpectedError).toBeFalsy();
  });

  test("should have errors", () => {
    expect(errorsObj).toBeTruthy();
    // @ts-ignore
    expect(errorsObj.contructor).toBe({}.contructor);
    // @ts-ignore
    expect(Object.keys(errorsObj).length).toBeTruthy();
  });
});

describe("should fail creating auth entry - undefined object", () => {
  const authObj = undefined;

  let authInstance: Auth | ErrorsObject | null = null;
  let errorsObj: ErrorsObject | Auth | null;
  beforeAll(async () => {
    // @ts-ignore
    authInstance = await authCreateService.create(authObj);

    errorsObj = authInstance;

    if (authInstance && authInstance.toJSON) {
      // @ts-ignore
      errorsObj = authInstance.toJSON();
    }
  });

  test("should not throw an exception", () => {
    // @ts-ignore
    expect(authInstance.errors).toBeTruthy();
    // @ts-ignore
    expect(authInstance.errors.unexpectedError).toBeTruthy();
  });

  test("should have errors", () => {
    expect(errorsObj).toBeTruthy();
    // @ts-ignore
    expect(errorsObj.contructor).toBe({}.contructor);
    // @ts-ignore
    expect(Object.keys(errorsObj).length).toBeTruthy();
  });
});
