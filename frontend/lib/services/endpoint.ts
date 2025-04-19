import { FetchError } from "@/lib/errors/endpoint";

type AllowedMethod =
  | "GET"
  | "POST"
  | "PATCH"
  | "DELETE"

type FetchProps<T extends {} = {}> = {
  url: string,
  method: AllowedMethod,
  data?: T
}

type FetchMethodProps<T extends {} = {}> = Omit<FetchProps<T>, "method">;

function unifiedFetch<T extends {} = {}>({ url, method, data }: FetchProps<T>) {
  console.log({ url, method, data });

  return fetch(url, {
    body: JSON.stringify(data ?? {}),
    method: method.toUpperCase(),
  })
    .catch((reason) => {
      return {
        name: "FetchError",
        message: `Could not fetch from resource ${url} using the method ${method}`,
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

export const Endpoint = { get, post, patch, del };
