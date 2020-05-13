import { Auth } from "@/layered-apps/auth/domain/auth";
import { AuthMockDomain } from "./auth-mock-domain";

const passwordVerifier = AuthMockDomain.PasswordVerifier();
const authGenerator = AuthMockDomain.AuthGenerator();

test("should exist auth object", () => {
  expect(Auth).toBeTruthy();
});

test("should match AuthGenerator and AuthMock authFields", () => {
  expect(Object.keys(authGenerator.getInstance())).toEqual(
    AuthMockDomain.authFields
  );
});

describe("should create valid Auth instance", () => {
  const authObjInstance = authGenerator.getInstance();

  const authInstance = AuthMockDomain.Auth(authObjInstance);
  const authInstancePlainPassword = authInstance.password;

  let isValid: boolean = false;
  let validationError: Error | null = null;
  let passwordHashError: Error | null = null;
  beforeAll(async () => {
    try {
      await authInstance.hashPassword();
    } catch (e) {
      passwordHashError = e;
    }

    try {
      isValid = authInstance.validate();
    } catch (e) {
      validationError = e;
    }
  });

  test("should have required properties", () => {
    expect(authObjInstance.id).toBe(authInstance.id);
    expect(authObjInstance.username).toBe(authInstance.username);
    expect(authObjInstance.email).toBe(authInstance.email);
    expect(authObjInstance.password).toBe(authInstancePlainPassword);
  });

  test("should hash password", async () => {
    expect(passwordHashError).toBeFalsy();
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

    expect(validationError).toBeFalsy();
    expect(isValid).toBe(true);
  });
});
