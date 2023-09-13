import { failure, buildResponse } from "../response-lib";

describe("Test the response-lib", () => {
  test("Failure should give a 500 status", () => {
    const res = failure({});
    expect(res.body).toBe("{}");
    expect(res.statusCode).toBe(500);
    expect(res.headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(res.headers["Access-Control-Allow-Credentials"]).toBe(true);
  });

  test("Build Response should create an object", () => {
    const res = buildResponse(420, {});
    expect(res.body).toBe("{}");
    expect(res.statusCode).toBe(420);
    expect(res.headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(res.headers["Access-Control-Allow-Credentials"]).toBe(true);
  });
});
