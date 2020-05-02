import { Auth } from '@/auth/domain/auth'
import { AuthObject } from '@/auth/domain/interfaces/auth-object'
import { ArgonPaswordHasher as PasswordHasher } from '@/auth/domain/password-hashers/argon-password-hasher'
import { AuthValidator } from '@/auth/domain/validators/auth-validator'
import { AuthGeneratorFaker as AuthGenerator } from './generator/auth-generator-faker'

const authGenerator = new AuthGenerator()
const passwordHasher = new PasswordHasher()
const authValidator = new AuthValidator()

const getNewAuth = (authObjInstance: AuthObject) =>
  new Auth(authObjInstance, passwordHasher, authValidator)

test('Auth object exists', () => {
  expect(Auth).toBeTruthy()
})

test('should create valid Auth instance', async () => {
  const authObjInstance = authGenerator.getInstance()

  const authInstance = getNewAuth(authObjInstance)

  expect(authObjInstance.id).toBe(authInstance.id)
  expect(authObjInstance.username).toBe(authInstance.username)
  expect(authObjInstance.email).toBe(authInstance.email)
  expect(authObjInstance.password).toBe(authInstance.password)

  try {
    await authInstance.hashPassword()
  } catch (err) {
    expect(err).toBeFalsy()
  }

  let hashIsValid

  try {
    hashIsValid = await passwordHasher.verify(
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

test('should fail creating Auth instance - empty object', async () => {
  const authObjInstance = {}

  // @ts-ignore
  const authInstance = getNewAuth(authObjInstance)

  expect(authInstance.id).toBeFalsy()
  expect(authInstance.username).toBeFalsy()
  expect(authInstance.email).toBeFalsy()
  expect(authInstance.password).toBeFalsy()

  try {
    await authInstance.hashPassword()
  } catch (err) {
    expect(err).toBeTruthy()
  }

  expect(() => authInstance.validate()).toThrow()
})
