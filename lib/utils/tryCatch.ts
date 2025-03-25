type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * Wraps a promise in a try-catch block, returning a `Result` object that
 * encapsulates either the resolved value or the caught error.
 *
 * @template T - The type of the resolved value of the promise.
 * @template E - The type of the error, defaults to `Error`.
 * @param {Promise<T>} promise - The promise to be executed.
 * @returns {Promise<Result<T, E>>} A promise that resolves to a `Result` object.
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
