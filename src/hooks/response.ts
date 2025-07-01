export type Fail<E> = { ok: false } & E
export type Ok<D> = { ok: true } & D
export type MaybePromise<T> = Promise<T> | T
