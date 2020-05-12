import { Auth } from "@/auth/domain/auth";
import { AuthMock } from "./auth-mock";

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
