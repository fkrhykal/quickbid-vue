export function isTypeError(e: unknown): e is TypeError {
  return e instanceof TypeError
}
