export function isTypeError(e: unknown): e is TypeError {
  return e instanceof TypeError
}

export function isNode(t: unknown): t is Node {
  return t instanceof Node
}
