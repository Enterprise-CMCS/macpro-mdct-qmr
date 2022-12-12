import { deleteBanner } from "../delete";
import { APIGatewayProxyEvent } from "aws-lambda";
import { testBanner, proxyEvent } from "./proxyEvent";
import dynamoDb from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";
import { mockDocumentClient } from "../../../utils/testing/setupJest";

jest.mock("../../../libs/authorization", () => ({
  isAuthorized: jest.fn().mockReturnValue(true),
  hasPermissions: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../libs/debug-lib", () => ({
  init: jest.fn(),
  flush: jest.fn(),
}));

const testEvent: APIGatewayProxyEvent = {
  ...proxyEvent,
  httpMethod: "DEL",
};

jest.spyOn(dynamoDb, "delete").mockImplementation(
  mockDocumentClient.delete.promise.mockReturnValue({
    Item: {
      ...testBanner,
    },
  })
);

describe("Test deleteBanner API method", () => {
  test("Test Successful Banner Deletion", async () => {
    const res = await deleteBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(JSON.parse(res.body).status).toBe(StatusCodes.SUCCESS);
  });

  test("Test bannerKey not provided throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: {},
    };
    const res = await deleteBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws 500 error", async () => {
    const noKeyEvent: APIGatewayProxyEvent = {
      ...testEvent,
      pathParameters: { bannerId: "" },
    };
    const res = await deleteBanner(noKeyEvent, null);

    expect(res.statusCode).toBe(StatusCodes.SERVER_ERROR);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
