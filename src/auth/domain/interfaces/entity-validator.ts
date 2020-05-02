export interface EntityValidator {
  errors(): null | object
  validate(authObj: { [property: string]: any }): boolean
}
