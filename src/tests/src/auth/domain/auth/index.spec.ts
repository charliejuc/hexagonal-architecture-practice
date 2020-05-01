import { Auth } from '@/auth/domain/auth'
// import { AuthGeneratorFaker as AuthGenerator } from '@/tests/src/auth/domain/auth/generator/auth-generator-faker'

// const authGenerator = new AuthGenerator()

test('Auth Object Exists', () => {
  expect(Auth).toBeTruthy()
})
