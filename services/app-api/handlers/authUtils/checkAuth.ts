import { APIGatewayProxyEvent } from "aws-lambda";

const authErrorHandler = (
  state: String,
  userState: String,
  userRole: String,
  operationType: String
) => {
  if (!state || !userState || !userRole || !operationType) {
    return 403;
  }
  if (
    operationType === "POST" ||
    operationType === "PUT" ||
    operationType === "DELETE"
  ) {
    if (
      !userRole.includes("state") ||
      state.toLowerCase() !== userState.toLowerCase()
    ) {
      return 403;
    }
  }
  if (operationType === "GET" || operationType === "LIST") {
    if (
      userRole.includes("state") &&
      state.toLowerCase() !== userState.toLowerCase()
    ) {
      return 403;
    }
  }
  return 200;
};

export const errorHandler = (
  event: APIGatewayProxyEvent,
  operationType: String
) => {
  if (!event.pathParameters) return 400;
  if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.headers.user_role
  )
    return 400;

  if (operationType !== "LIST" && !event.pathParameters.coreSet) return 400;

  return authErrorHandler(
    event.pathParameters.state,
    // @ts-ignore
    event.headers.user_state,
    event.headers.user_role,
    operationType
  );
};

export const measureErrorHandler = (
  event: APIGatewayProxyEvent,
  operationType: String
) => {
  if (!event.pathParameters) return 400;
  if (
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet ||
    !event.headers.user_role
  )
    return 400;

  if (operationType !== "LIST" && !event.pathParameters.measure) return 400;
  if (operationType === "POST" && !event.body) return 400;

  return authErrorHandler(
    event.pathParameters.state,
    // @ts-ignore
    event.headers.user_state,
    event.headers.user_role,
    operationType
  );
};
