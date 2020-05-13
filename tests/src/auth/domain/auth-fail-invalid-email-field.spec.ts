import { AuthMockDomain } from "./auth-mock-domain";

const authGenerator = AuthMockDomain.AuthGenerator();
const authObjInstance = authGenerator.getInstance();

describe('invalid "email" value', () => {
  const _authObjInstance = Object.assign({}, authObjInstance);

  describe('undefined "email"', () => {
    // @ts-ignore
    _authObjInstance.email = undefined;

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

  describe('null "email"', () => {
    // @ts-ignore
    _authObjInstance.email = null;

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

  describe('empty string ("") "email"', () => {
    // @ts-ignore
    _authObjInstance.email = "";

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

  describe('literal object ({}) "email"', () => {
    // @ts-ignore
    _authObjInstance.email = {};

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

  describe('array ([]) "email"', () => {
    // @ts-ignore
    _authObjInstance.email = [];

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

  describe('Invalid "email" format "mike"', () => {
    // @ts-ignore
    _authObjInstance.email = "mike";

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

  describe('Invalid "email" format "mike.es"', () => {
    // @ts-ignore
    _authObjInstance.email = "mike.es";

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

  describe('Invalid "email" format "something#domain.com"', () => {
    // @ts-ignore
    _authObjInstance.email = "something#domain.com";

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
