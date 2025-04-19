export type FetchError = Error & { name: "FetchError"; reason: any };
export type InvalidMethodError = Error & { name: "InvalidMethodError"; given: string };
