export interface PropertyValidator {
  validate(property: any, field: string): boolean;
  error(): null | string;
}
