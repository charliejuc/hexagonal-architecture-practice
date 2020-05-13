import { AuthMockDomain } from "./auth-mock-domain";
import { ErrorsObject } from "@/auth/domain/types/errors-object";

const authGenerator = AuthMockDomain.AuthGenerator();
const authObjInstance = authGenerator.getInstance();

describe('invalid "password" value', () => {
  const _authObjInstance = Object.assign({}, authObjInstance);

  describe('undefined "password"', () => {
    // @ts-ignore
    _authObjInstance.password = undefined;

    const authInstance = AuthMockDomain.Auth(_authObjInstance);

    let isValid: boolean = false;
    beforeAll(async () => {
      try {
        await authInstance.hashPassword();
      } catch (e) {}

      try {
        isValid = authInstance.validate();
      } catch (e) {}
    });

    test("validate() should be false ", async () => {
      expect(isValid).toBe(false);
    });

    test("should not have validationErrors", () => {
      const validationErrors = authInstance.errors();

      expect(validationErrors).toBeFalsy();
    });
  });

  describe('null "password"', () => {
    // @ts-ignore
    _authObjInstance.password = null;

    const authInstance = AuthMockDomain.Auth(_authObjInstance);

    let isValid: boolean = false;
    beforeAll(async () => {
      try {
        await authInstance.hashPassword();
      } catch (e) {}

      try {
        isValid = authInstance.validate();
      } catch (e) {}
    });

    test("validate() should be false ", async () => {
      expect(isValid).toBe(false);
    });

    test("should not have validationErrors", () => {
      const validationErrors = authInstance.errors();

      expect(validationErrors).toBeFalsy();
    });
  });

  describe('empty string ("") "password"', () => {
    // @ts-ignore
    _authObjInstance.password = "";

    const authInstance = AuthMockDomain.Auth(_authObjInstance);

    let isValid: boolean = false;
    beforeAll(async () => {
      await authInstance.hashPassword();

      isValid = authInstance.validate();
    });

    test("validate() should be false ", async () => {
      expect(isValid).toBe(false);
    });

    test("should have validationErrors length of 1", () => {
      const validationErrorsLen = 1;

      const validationErrors = authInstance.errors();

      expect(validationErrors).toBeTruthy();
      expect(Object.keys(validationErrors || []).length).toBe(
        validationErrorsLen
      );
    });
  });

  describe('literal object ({}) "password"', () => {
    // @ts-ignore
    _authObjInstance.password = {};

    const authInstance = AuthMockDomain.Auth(_authObjInstance);

    let isValid: boolean = false;
    beforeAll(async () => {
      try {
        await authInstance.hashPassword();
      } catch (e) {}

      try {
        isValid = authInstance.validate();
      } catch (e) {}
    });

    test("validate() should be false ", async () => {
      expect(isValid).toBe(false);
    });

    test("should not have validationErrors", () => {
      const validationErrors = authInstance.errors();

      expect(validationErrors).toBeFalsy();
    });
  });

  describe('array ([]) "password"', () => {
    // @ts-ignore
    _authObjInstance.password = [];

    const authInstance = AuthMockDomain.Auth(_authObjInstance);

    let isValid: boolean = false;
    beforeAll(async () => {
      try {
        await authInstance.hashPassword();
      } catch (e) {}

      try {
        isValid = authInstance.validate();
      } catch (e) {}
    });

    test("validate() should be false ", async () => {
      expect(isValid).toBe(false);
    });

    test("should have validationErrors length of 1", () => {
      const validationErrorsLen = 1;

      const validationErrors = authInstance.errors();

      expect(validationErrors).toBeTruthy();
      expect(Object.keys(validationErrors || []).length).toBe(
        validationErrorsLen
      );
    });
  });

  describe('short "password" 9 characters', () => {
    // @ts-ignore
    _authObjInstance.password = authObjInstance.password.slice(0, 9);

    const authInstance = AuthMockDomain.Auth(_authObjInstance);

    let isValid: boolean = false;
    let validationErrors: null | ErrorsObject;
    beforeAll(async () => {
      await authInstance.hashPassword();
      isValid = authInstance.validate();

      validationErrors = authInstance.errors();
    });

    test("validate() should be false ", async () => {
      expect(isValid).toBe(false);
    });

    test("should have validationErrors length of 1", () => {
      const validationErrorsLen = 1;

      expect(validationErrors).toBeTruthy();
      expect(Object.keys(validationErrors || []).length).toBe(
        validationErrorsLen
      );
    });

    test("password error should contain min and max passwords length", () => {
      // @ts-ignore
      expect(validationErrors.password).toBeTruthy();
      // @ts-ignore
      expect(validationErrors.password).toContain(
        AuthMockDomain.minPasswordLength
      );
      // @ts-ignore
      expect(validationErrors.password).toContain(
        AuthMockDomain.maxPasswordLength
      );
    });
  });
});
