import { describe, test, expect, vi } from "vitest";
import { Endpoint } from "./endpoint";
import { FetchError, InvalidMethodError } from "../errors/endpoint";

describe("Endpoint", () => {
  test("normal url/method should return ok", async () => {
    global.fetch = vi.fn(() => {
      return Promise.resolve(new Response(null, { status: 200 }));
    });

    const response = await Endpoint.get({
      url: "https://google.com"
    }) as Response;

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toReturn();

    expect(response.status).toBe(200);
    expect(response.body).toBeNull();
  });

  test("normal url/method with different status code", async () => {
    global.fetch = vi.fn(() => {
      return Promise.resolve(new Response(null, { status: 404 }));
    });

    const response = await Endpoint.get({
      url: "https://google.com"
    }) as Response;

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toReturn();

    expect(response.status).toBe(404);
    expect(response.body).toBeNull();
  });

  test("normal url/method with json body", async () => {
    global.fetch = vi.fn(() => {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            message: "Hello, world!"
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json"
            }
          }
        ));
    });

    const response = await Endpoint.get({
      url: "https://google.com"
    }) as Response;

    expect(global.fetch).toHaveBeenCalledOnce();
    expect(global.fetch).toReturn();

    expect(response.status).toBe(404);

    const json = await response.json();

    expect(json).toBeTypeOf('object');
    expect(json.message).toStrictEqual('Hello, world!');
  });

  test("invalid method should return InvalidMethodError", async () => {
    global.fetch = vi.fn(() => {
      return Promise.resolve(new Response(null, { status: 200 }));
    });

    const messageRe = /Expected one of \[(([A-Z],? ?)+)?\], got OPTIONS/
    const response = await Endpoint.fetch({
      url: "https://google.com",
      method: "OPTIONS" as "GET", // passing through the TypeScript compiler 
    }) as InvalidMethodError;

    expect(global.fetch).not.toHaveBeenCalled();
    expect(global.fetch).not.toReturn();

    expect(response.name).toStrictEqual("InvalidMethodError");
    expect(response.given).toStrictEqual("OPTIONS");
    expect(response.message).toMatch(messageRe);
  });

  test("promise rejecting in fetch should return FetchError", async () => {
    global.fetch = vi.fn(() => {
      return Promise.reject("Hello, world!");
    });

    const url = "https://google.com"
    const method = "GET"

    const response = await Endpoint.fetch({ url, method, }) as FetchError;

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toReturn();

    expect(response.name).toStrictEqual("FetchError");
    expect(response.message).toStrictEqual(`Could not fetch from resource '${url}' using the method '${method}'`);
    expect(response.reason).toStrictEqual("Hello, world!");
  });
});
