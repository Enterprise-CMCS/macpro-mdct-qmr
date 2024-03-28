import { createMeasure } from "../create";

import { APIGatewayProxyEvent } from "../../../types";
import { testEvent } from "../../../test-util/testEvents";
import { StatusCodes, Errors } from "../../../utils/constants/constants";

jest.mock("../../../libs/dynamodb-lib", () => ({
  put: jest.fn(),
}));

const mockHasRolePermissions = jest.fn();
const mockHasStatePermissions = jest.fn();
jest.mock("../../../libs/authorization", () => ({
  isAuthenticated: jest.fn().mockReturnValue(true),
  hasRolePermissions: () => mockHasRolePermissions(),
  hasStatePermissions: () => mockHasStatePermissions(),
}));

jest.mock("../../dynamoUtils/createCompoundKey", () => ({
  __esModule: true,
  createCompoundKey: jest.fn().mockReturnValue("FL2020ACSFUA-AD"),
}));

describe("Test Create Measure Handler", () => {
  beforeEach(() => {
    mockHasRolePermissions.mockImplementation(() => false);
  });

  test("Test unauthorized user attempt (incorrect state)", async () => {
    mockHasRolePermissions.mockImplementation(() => true);
    mockHasStatePermissions.mockImplementation(() => false);
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}, "description": "sample desc"}`,
      headers: { "cognito-identity-id": "test" },
    };
    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    expect(res.body).toContain(Errors.UNAUTHORIZED);
  });

  test("Test Successful Run of Measure Creation with description", async () => {
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}, "description": "sample desc", "detailedDescription": "sample detailed desc"}`,
      headers: { "cognito-identity-id": "test" },
    };

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("sample desc");
    expect(res.body).toContain("sample detailed desc");
    expect(res.body).toContain("FL2020ACSFUA-AD");
  });

  test("Test Successful Run of Measure Creation without description", async () => {
    const event: APIGatewayProxyEvent = {
      ...testEvent,
      body: `{"data": {}}`,
      headers: { "cognito-identity-id": "test" },
    };

    const res = await createMeasure(event, null);

    expect(res.statusCode).toBe(StatusCodes.SUCCESS);
    expect(res.body).toContain("test");
    expect(res.body).toContain("FL2020ACSFUA-AD");
  });
});
