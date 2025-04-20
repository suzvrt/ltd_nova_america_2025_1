import { FetchError, InvalidMethodError } from "@/lib/errors/endpoint";

const ALLOWED_METHODS = ["GET", "POST", "PATCH", "DELETE"] as const;
type AllowedMethod = typeof ALLOWED_METHODS[number];

type FetchProps<T extends {} = {}> = {
  url: string,
  method: AllowedMethod,
  data?: T
}

type FetchMethodProps<T extends {} = {}> = Omit<FetchProps<T>, "method">;

async function unifiedFetch<T extends {} = {}>({ url, method, data, ...props }: FetchProps<T> & RequestInit) {
  if (!ALLOWED_METHODS.includes(method)) {
    return {
      name: "InvalidMethodError",
      given: method,
      message: `Expected one of [${ALLOWED_METHODS.join(', ')}], got ${method}`
    } satisfies InvalidMethodError;
  }

  return fetch(url, {
    body: JSON.stringify(data ?? {}),
    method: method.toUpperCase(),
    ...props,
  })
    .catch((reason) => {
      return {
        name: "FetchError",
        message: `Could not fetch from resource '${url}' using the method '${method}'`,
        reason,
      } satisfies FetchError;
    })
}

export function get<T extends {} = {}>(props: FetchMethodProps<T>) {
  return unifiedFetch({ method: "GET", ...props });
}

export function post<T extends {} = {}>(props: FetchMethodProps<T>) {
  return unifiedFetch({ method: "POST", ...props });
}

export function patch<T extends {} = {}>(props: FetchMethodProps<T>) {
  return unifiedFetch({ method: "PATCH", ...props });
}

// Uso de delete não é possível pois delete é uma keyword de JS
export function del<T extends {} = {}>(props: FetchMethodProps<T>) {
  return unifiedFetch({ method: "DELETE", ...props });
}

export const Endpoint = { get, post, patch, del, fetch: unifiedFetch };
