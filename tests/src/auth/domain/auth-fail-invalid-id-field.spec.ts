import { AuthMockDomain } from "./auth-mock-domain";

const authGenerator = AuthMockDomain.AuthGenerator();
const authObjInstance = authGenerator.getInstance();

describe('invalid "id" value', () => {
  const _authObjInstance = Object.assign({}, authObjInstance);

  describe('undefined "id"', () => {
    // @ts-ignore
    _authObjInstance.id = undefined;

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

  describe('null "id"', () => {
    // @ts-ignore
    _authObjInstance.id = null;

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

  describe('empty string ("") "id"', () => {
    // @ts-ignore
    _authObjInstance.id = "";

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

  describe('literal object ({}) "id"', () => {
    // @ts-ignore
    _authObjInstance.id = {};

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

  describe('array ([]) "id"', () => {
    // @ts-ignore
    _authObjInstance.id = [];

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
});
