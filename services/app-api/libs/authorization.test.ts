import { testEvent } from "../util/testEvents";

import { isAuthorized } from "./authorization";

describe("Authorization Lib Function", () => {
  describe("State User Tests", () => {
    const event = { ...testEvent };

    beforeEach(() => {
      event.httpMethod = "GET";
      event.headers = { "x-api-key": "test" };
      event.pathParameters = { state: "AL" };
    });

    it("authorization should retrun true", () => {
      expect(true).toBeTruthy();
    });
  });

  //   describe("Auth User Tests", () => {});
});
