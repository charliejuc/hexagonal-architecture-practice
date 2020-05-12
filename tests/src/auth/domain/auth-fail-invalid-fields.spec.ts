import { AuthMock } from "./auth-mock";

const authGenerator = AuthMock.AuthGenerator();

describe("validate fails - invalid field", () => {
  const authObjInstance = authGenerator.getInstance();

  describe('invalid "id" value', () => {
    const _authObjInstance = Object.assign({}, authObjInstance);

    describe('undefined "id"', () => {
      // @ts-ignore
      _authObjInstance.id = undefined;

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

    describe('null "id"', () => {
      // @ts-ignore
      _authObjInstance.id = null;

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

    describe('empty string ("") "id"', () => {
      // @ts-ignore
      _authObjInstance.id = "";

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

    describe('literal object ({}) "id"', () => {
      // @ts-ignore
      _authObjInstance.id = {};

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

    describe('array ([]) "id"', () => {
      // @ts-ignore
      _authObjInstance.id = [];

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

  describe('invalid "email" value', () => {
    const _authObjInstance = Object.assign({}, authObjInstance);

    describe('undefined "email"', () => {
      // @ts-ignore
      _authObjInstance.email = undefined;

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

    describe('null "email"', () => {
      // @ts-ignore
      _authObjInstance.email = null;

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

    describe('empty string ("") "email"', () => {
      // @ts-ignore
      _authObjInstance.email = "";

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

    describe('literal object ({}) "email"', () => {
      // @ts-ignore
      _authObjInstance.email = {};

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

    describe('array ([]) "email"', () => {
      // @ts-ignore
      _authObjInstance.email = [];

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

    describe('Invalid "email" format "mike"', () => {
      // @ts-ignore
      _authObjInstance.email = "mike";

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

    describe('Invalid "email" format "mike.es"', () => {
      // @ts-ignore
      _authObjInstance.email = "mike.es";

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

    describe('Invalid "email" format "something#domain.com"', () => {
      // @ts-ignore
      _authObjInstance.email = "something#domain.com";

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
});
