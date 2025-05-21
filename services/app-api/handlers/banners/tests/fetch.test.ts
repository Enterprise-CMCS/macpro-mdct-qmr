import { fetchBanner } from "../fetch";
import { APIGatewayProxyEvent, EventParameters } from "../../../types";
import dynamoDb from "../../../libs/dynamodb-lib";
import { Errors, StatusCodes } from "../../../utils/constants/constants";

jest.mock("../../../libs/authorization", () => ({
  hasPermissions: jest.fn().mockReturnValue(true),
}));

jest.mock("../../../libs/dynamodb-lib", () => ({
  get: jest.fn().mockResolvedValue({
    title: "test banner",
    description: "test description",
    link: "https://www.example.com",
    startDate: 1000,
    endDate: 2000,
    createdAt: new Date().getTime(),
    lastAltered: new Date().getTime(),
  }),
}));

const testEvent = {
  headers: {
    "cognito-identity-id": "test",
  } as EventParameters,
  pathParameters: {
    bannerId: "admin-banner-id",
  } as EventParameters,
} as APIGatewayProxyEvent;

describe("Test fetchBanner API method", () => {
  test("Test Successful empty Banner Fetch", async () => {
    (dynamoDb.get as jest.Mock).mockResolvedValueOnce({
      Item: undefined,
    });
    const res = await fetchBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
  });

  test("Test Successful Banner Fetch", async () => {
    const res = await fetchBanner(testEvent, null);
    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    const parsedBody = JSON.parse(res.body);
    expect(parsedBody.Item.title).toEqual("test banner");
    expect(parsedBody.Item.description).toEqual("test description");
    expect(parsedBody.Item.startDate).toEqual(1000);
    expect(parsedBody.Item.endDate).toEqual(2000);
    expect(parsedBody.Item.link).toEqual("https://www.example.com");
  });

  test("Test bannerKey not provided throws bad request error", async () => {
    testEvent.pathParameters = {};
    const res = await fetchBanner(testEvent, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey empty throws bad request error", async () => {
    testEvent.pathParameters = { bannerId: "" };
    const res = await fetchBanner(testEvent, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });

  test("Test bannerKey invalid throws bad request error", async () => {
    testEvent.pathParameters = { bannerId: "key-that-doesnt-exist" };
    const res = await fetchBanner(testEvent, null);

    expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(res.body).toContain(Errors.NO_KEY);
  });
});
