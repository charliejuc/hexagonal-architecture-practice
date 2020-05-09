import { Auth } from '@/auth/domain/auth'
import { AuthMock } from './auth-mock'

const passwordVerifier = AuthMock.PasswordVerifier()
const authGenerator = AuthMock.AuthGenerator()

test('Auth object exists', () => {
  expect(Auth).toBeTruthy()
})

test('should create valid Auth instance', async () => {
  const authObjInstance = authGenerator.getInstance()

  const authInstance = AuthMock.Auth(authObjInstance)

  expect(authObjInstance.id).toBe(authInstance.id)
  expect(authObjInstance.username).toBe(authInstance.username)
  expect(authObjInstance.email).toBe(authInstance.email)
  expect(authObjInstance.password).toBe(authInstance.password)

  let err
  try {
    await authInstance.hashPassword()
  } catch (e) {
    err = e
  }

  expect(err).toBeFalsy()

  let hashIsValid
  try {
    hashIsValid = await passwordVerifier.verify(
      authInstance.password,
      authObjInstance.password
    )
  } catch (err) {
    hashIsValid = false
  }

  expect(hashIsValid).toBe(true)

  expect(authInstance.validate).toBeTruthy()
  expect(authInstance.validate()).toBe(true)
})

describe('should fail', () => {
  test('creating Auth instance - empty object', async () => {
    const authObjInstance = {}

    // @ts-ignore
    const authInstance = AuthMock.Auth(authObjInstance)

    expect(authInstance.id).toBeFalsy()
    expect(authInstance.username).toBeFalsy()
    expect(authInstance.email).toBeFalsy()
    expect(authInstance.password).toBeFalsy()

    let err
    try {
      await authInstance.hashPassword()
    } catch (e) {
      err = e
    }

    expect(err).toBeTruthy()

    expect(() => authInstance.validate()).toThrow()
  })

  test('validate - missing field', async () => {
    let authObjInstance = authGenerator.getInstance()
    const authObjInstanceKeys: string[] = Object.keys(authObjInstance)
    const lastField = authObjInstanceKeys[authObjInstanceKeys.length - 1]

    for (let field of authObjInstanceKeys) {
      if (field === 'password') {
        continue
      }

      delete authObjInstance[field]

      // @ts-ignore
      const authInstance = AuthMock.Auth(authObjInstance)

      let err
      try {
        await authInstance.hashPassword()
      } catch (e) {
        err = e
      }

      expect(err).toBeFalsy()

      let isValid
      try {
        isValid = authInstance.validate()
      } catch (e) {
        err = e
      }

      expect(err).toBeFalsy()
      expect(isValid).toBeFalsy()

      let validationErrors = authInstance.errors()

      expect(validationErrors).toBeTruthy()
      expect(validationErrors && Object.keys(validationErrors).length).toBe(1)

      if (field !== lastField) {
        authObjInstance = authGenerator.getInstance()
      }
    }
  })
})
