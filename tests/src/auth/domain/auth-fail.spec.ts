import { AuthPasswordHashingRequired } from "@/auth/domain/exceptions/auth-password-hashing-required";
import { AuthMockDomain } from "./auth-mock-domain";
import { Auth } from "@/auth/domain/auth";
import { AuthInvalidConstructorObject } from "@/auth/domain/exceptions/auth-invalid-constructor-object";

const authGenerator = AuthMockDomain.AuthGenerator();

test("creating Auth instance - empty object", async () => {
  const authObjInstance = {};

  // @ts-ignore
  const authInstance = AuthMockDomain.Auth(authObjInstance);

  expect(authInstance.id).toBeFalsy();
  expect(authInstance.username).toBeFalsy();
  expect(authInstance.email).toBeFalsy();
  expect(authInstance.password).toBeFalsy();

  let err;
  try {
    await authInstance.hashPassword();
  } catch (e) {
    err = e;
  }

  expect(err).toBeTruthy();

  expect(() => authInstance.validate()).toThrow();
});

test("creating Auth instance - undefined", async () => {
  const authObjInstance = undefined;
  let authInstance: Auth | { [key: string]: any } = {};

  let err: Error | null = null;
  try {
    // @ts-ignore
    authInstance = AuthMockDomain.Auth(authObjInstance);
  } catch (e) {
    err = e;
  }

  expect(err).toBeInstanceOf(AuthInvalidConstructorObject);

  expect(authInstance.id).toBeFalsy();
  expect(authInstance.username).toBeFalsy();
  expect(authInstance.email).toBeFalsy();
  expect(authInstance.password).toBeFalsy();

  try {
    await authInstance.hashPassword();
  } catch (e) {
    err = e;
  }

  expect(err).toBeTruthy();

  expect(() => authInstance.validate()).toThrow();
});

test("creating Auth instance - null", async () => {
  const authObjInstance = null;
  let authInstance: Auth | { [key: string]: any } = {};

  let err: Error | null = null;
  try {
    // @ts-ignore
    authInstance = AuthMockDomain.Auth(authObjInstance);
  } catch (e) {
    err = e;
  }

  expect(err).toBeInstanceOf(AuthInvalidConstructorObject);

  expect(authInstance.id).toBeFalsy();
  expect(authInstance.username).toBeFalsy();
  expect(authInstance.email).toBeFalsy();
  expect(authInstance.password).toBeFalsy();

  try {
    await authInstance.hashPassword();
  } catch (e) {
    err = e;
  }

  expect(err).toBeTruthy();

  expect(() => authInstance.validate()).toThrow();
});

test("creating Auth instance - Array ([])", async () => {
  const authObjInstance: [] = [];
  let authInstance: Auth | { [key: string]: any } = {};

  let err: Error | null = null;
  try {
    // @ts-ignore
    authInstance = AuthMockDomain.Auth(authObjInstance);
  } catch (e) {
    err = e;
  }

  expect(err).toBeFalsy();

  expect(authInstance.id).toBeFalsy();
  expect(authInstance.username).toBeFalsy();
  expect(authInstance.email).toBeFalsy();
  expect(authInstance.password).toBeFalsy();

  try {
    await authInstance.hashPassword();
  } catch (e) {
    err = e;
  }

  expect(err).toBeTruthy();

  expect(() => authInstance.validate()).toThrow();
});

describe("validate - missing field", () => {
  const authFields = AuthMockDomain.authFields;

  for (let field of authFields) {
    if (field === "password") {
      continue;
    }

    describe(`missing "${field}" field`, () => {
      let authObjInstance = authGenerator.getInstance();

      delete authObjInstance[field];

      const authInstance = AuthMockDomain.Auth(authObjInstance);

      let isValid: boolean = false;
      let err: Error | null = null;
      beforeAll(async () => {
        await authInstance.hashPassword();

        try {
          isValid = authInstance.validate();
        } catch (e) {
          err = e;
        }
      });

      test("validate() should fail with no exception", async () => {
        expect(err).toBeFalsy();
        expect(isValid).toBeFalsy();
      });

      test("should have validationErrors length of 1", () => {
        const validationErrors = authInstance.errors();

        expect(validationErrors).toBeTruthy();
        expect(validationErrors && Object.keys(validationErrors).length).toBe(
          1
        );
      });
    });
  }

  describe('missing "password" field', () => {
    let authObjInstance = authGenerator.getInstance();

    delete authObjInstance["password"];

    const authInstance = AuthMockDomain.Auth(authObjInstance);

    let isValid: boolean = false;
    let validationError: Error | null = null;
    let hashPasswordError: Error | null = null;
    beforeAll(async () => {
      try {
        await authInstance.hashPassword();
      } catch (e) {
        hashPasswordError = e;
      }

      try {
        isValid = authInstance.validate();
      } catch (e) {
        validationError = e;
      }
    });

    test("validate() should fail with exception", async () => {
      expect(hashPasswordError).toBeTruthy();
    });

    test("should have no hashed password exception", () => {
      expect(validationError).toBeTruthy();
      expect(validationError).toBeInstanceOf(AuthPasswordHashingRequired);
      expect(isValid).toBeFalsy();
    });

    test("should not have validationErrors", () => {
      let validationErrors = authInstance.errors();

      expect(validationErrors).toBeFalsy();
    });
  });
});
