import { AuthMock } from "./auth-mock";

const authGenerator = AuthMock.AuthGenerator();
const authObjInstance = authGenerator.getInstance();

describe('invalid "username" value', () => {
  const _authObjInstance = Object.assign({}, authObjInstance);

  describe('undefined "username"', () => {
    // @ts-ignore
    _authObjInstance.username = undefined;

    const authInstance = AuthMock.Auth(_authObjInstance);

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

  describe('null "username"', () => {
    // @ts-ignore
    _authObjInstance.username = null;

    const authInstance = AuthMock.Auth(_authObjInstance);

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

  describe('empty string ("") "username"', () => {
    // @ts-ignore
    _authObjInstance.username = "";

    const authInstance = AuthMock.Auth(_authObjInstance);

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

  describe('literal object ({}) "username"', () => {
    // @ts-ignore
    _authObjInstance.username = {};

    const authInstance = AuthMock.Auth(_authObjInstance);

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

  describe('array ([]) "username"', () => {
    // @ts-ignore
    _authObjInstance.username = [];

    const authInstance = AuthMock.Auth(_authObjInstance);

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

  describe('"username" with spaces "Mike Graham"', () => {
    // @ts-ignore
    _authObjInstance.username = "Mike Graham";

    const authInstance = AuthMock.Auth(_authObjInstance);

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

  describe('"username" with diacritics "Julián_Fernández"', () => {
    // @ts-ignore
    _authObjInstance.username = "Julián_Fernández";

    const authInstance = AuthMock.Auth(_authObjInstance);

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

  describe('"username" with dash "mike-spark12"', () => {
    // @ts-ignore
    _authObjInstance.username = "mike-spark12";

    const authInstance = AuthMock.Auth(_authObjInstance);

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
