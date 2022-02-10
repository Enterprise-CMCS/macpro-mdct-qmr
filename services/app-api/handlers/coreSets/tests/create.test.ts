import { createCoreSet } from "../create";

import { testEvent } from "../../../test-util/testEvents";
import dynamoDb from "../../../libs/dynamodb-lib";
import { measures } from "../../dynamoUtils/measureList";
import { CoreSetAbbr } from "../../../types";
import { getCoreSet } from "../get";

jest.mock("../../../libs/dynamodb-lib", () => ({
  __esModule: true,
  default: {
    put: jest.fn(),
    post: jest.fn().mockReturnValue({}),
  },
}));

jest.mock("../../../libs/authorization", () => ({
  __esModule: true,
  isAuthorized: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../libs/debug-lib", () => ({
  __esModule: true,
  init: jest.fn(),
  flush: jest.fn(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2021ACSFUA-AD"),
}));

jest.mock("../get", () => ({
  __esModule: true,
  getCoreSet: jest.fn(),
}));

describe("Testing the Create CoreSet Functions", () => {
  beforeEach(() => {
    (getCoreSet as jest.Mock).mockReset();
  });

  test("Test createCoreSet but coreSet exists", async () => {
    (getCoreSet as jest.Mock).mockReturnValue({
      body: JSON.stringify({ test: "test" }),
    });
    const res = await createCoreSet(
      {
        ...testEvent,
        pathParameters: { state: "FL", year: "2021", coreSet: CoreSetAbbr.ACS },
      },
      null
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("statusCode");
    expect(res.body).toContain("400");
    expect(res.body).toContain(
      "Failure to create coreset. Coreset already exists."
    );
  });

  test("Test createCoreSet", async () => {
    (getCoreSet as jest.Mock).mockReturnValue({ body: JSON.stringify({}) });
    const list = measures[2021].filter((measure) => measure.type === "A");
    const res = await createCoreSet(
      {
        ...testEvent,
        pathParameters: { state: "FL", year: "2021", coreSet: CoreSetAbbr.ACS },
      },
      null
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toContain("Item");
    expect(res.body).toContain("coreSet");
    expect(res.body).toContain("submitted");
    expect(dynamoDb.post).toHaveBeenCalledTimes(list.length + 1);
  });
});
