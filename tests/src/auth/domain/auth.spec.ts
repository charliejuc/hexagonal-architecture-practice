import { Auth } from "@/auth/domain/auth";
import { AuthMock } from "./auth-mock";
import { AuthPasswordHashingRequired } from "@/auth/domain/exceptions/auth-password-hashing-required";

const passwordVerifier = AuthMock.PasswordVerifier();
const authGenerator = AuthMock.AuthGenerator();

test("should exist auth object", () => {
  expect(Auth).toBeTruthy();
});

test("should match AuthGenerator and AuthMock authFields", () => {
  expect(Object.keys(authGenerator.getInstance())).toEqual(AuthMock.authFields);
});

describe("should create valid Auth instance", () => {
  const authObjInstance = authGenerator.getInstance();

  const authInstance = AuthMock.Auth(authObjInstance);

  test("should have required properties", () => {
    expect(authObjInstance.id).toBe(authInstance.id);
    expect(authObjInstance.username).toBe(authInstance.username);
    expect(authObjInstance.email).toBe(authInstance.email);
    expect(authObjInstance.password).toBe(authInstance.password);
  });

  test("should hash password", async () => {
    let err;
    try {
      await authInstance.hashPassword();
    } catch (e) {
      err = e;
    }

    expect(err).toBeFalsy();
  });

  test("should verify password hash successfully", async () => {
    let hashIsValid;
    try {
      hashIsValid = await passwordVerifier.verify(
        authInstance.password,
        authObjInstance.password
      );
    } catch (err) {
      hashIsValid = false;
    }

    expect(hashIsValid).toBe(true);
  });

  test("should validate instance fields successfully", () => {
    expect(authInstance.validate).toBeTruthy();

    let isValid;
    let err;
    try {
      isValid = authInstance.validate();
    } catch (e) {
      err = e;
    }

    expect(err).toBeFalsy();
    expect(isValid).toBe(true);
  });
});

describe("should fail", () => {
  test("creating Auth instance - empty object", async () => {
    const authObjInstance = {};

    // @ts-ignore
    const authInstance = AuthMock.Auth(authObjInstance);

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

  describe("validate - missing field", () => {
    const authFields = AuthMock.authFields;

    for (let field of authFields) {
      if (field === "password") {
        continue;
      }

      describe(`missing "${field}" field`, () => {
        let authObjInstance = authGenerator.getInstance();

        delete authObjInstance[field];

        const authInstance = AuthMock.Auth(authObjInstance);

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

      const authInstance = AuthMock.Auth(authObjInstance);

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

  describe("validate - invalid field", () => {
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
        _authObjInstance.email = 'mike';

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
        _authObjInstance.email = 'mike.es';

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
        _authObjInstance.email = 'something#domain.com';

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
});
