import { Auth } from "@/auth/domain/auth";
import { AuthMock } from "./auth-mock";
import { AuthPasswordHashingRequired } from "@/auth/domain/exceptions/auth-password-hashing-required";

const passwordVerifier = AuthMock.PasswordVerifier();
const authGenerator = AuthMock.AuthGenerator();

test("should existauth object", () => {
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

        test("validate() should fail with no exception", async () => {
          await authInstance.hashPassword();

          let isValid: boolean = false;
          let err: Error | null = null;
          try {
            isValid = authInstance.validate();
          } catch (e) {
            err = e;
          }

          expect(err).toBeFalsy();
          expect(isValid).toBeFalsy();
        });

        test("should have validationErrors length of 1", () => {
          let validationErrors = authInstance.errors();

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

      test("validate() should fail with exception", async () => {
        let err: Error | null = null;

        try {
          await authInstance.hashPassword();
        } catch (e) {
          err = e;
        }

        expect(err).toBeTruthy();
      });

      test("should have no hashed password exception", () => {
        let err: Error | null = null;
        let isValid: boolean = false;
        try {
          isValid = authInstance.validate();
        } catch (e) {
          err = e;
        }

        expect(err).toBeTruthy();
        expect(err).toBeInstanceOf(AuthPasswordHashingRequired);
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

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('empty string ("") "id"', () => {
        // @ts-ignore
        _authObjInstance.id = "";

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('literal object ({}) "id"', () => {
        // @ts-ignore
        _authObjInstance.id = {};

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('array ([]) "id"', () => {
        // @ts-ignore
        _authObjInstance.id = [];

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });
    });

    describe('invalid "username" value', () => {
      const _authObjInstance = Object.assign({}, authObjInstance);

      describe('undefined "username"', () => {
        // @ts-ignore
        _authObjInstance.username = undefined;

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('empty string ("") "username"', () => {
        // @ts-ignore
        _authObjInstance.username = "";

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('literal object ({}) "username"', () => {
        // @ts-ignore
        _authObjInstance.username = {};

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('array ([]) "username"', () => {
        // @ts-ignore
        _authObjInstance.username = [];

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('"username" with spaces "Mike Graham"', () => {
        // @ts-ignore
        _authObjInstance.username = "Mike Graham";

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });

      describe('"username" with diacritics "Julián Fernández"', () => {
        // @ts-ignore
        _authObjInstance.username = "Julián_Fernández";

        const authInstance = AuthMock.Auth(_authObjInstance);

        test("validate() should be false ", async () => {
          await authInstance.hashPassword();

          expect(authInstance.validate()).toBe(false);
        });

        test("should have validationErrors length of 1", () => {
          const validationErrors = authInstance.errors();

          expect(validationErrors).toBeTruthy();
          expect(Object.keys(validationErrors || []).length).toBe(1);
        });
      });
    });
  });
});
