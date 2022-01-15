import { APIGatewayProxyEvent } from "aws-lambda";

enum UserRoles {
  ADMIN = "mdctqmr-approver",
  STATE = "mdctqmr-state-user",
  HELP = "mdctqmr-help-desk",
}

const authErrorHandler = (
  state: string,
  userState: string,
  userRole: string,
  operationType: string
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
      !(userRole === UserRoles.STATE) ||
      state.toLowerCase() !== userState.toLowerCase()
    ) {
      return 403;
    }
  }
  if (operationType === "GET" || operationType === "LIST") {
    if (
      userRole === UserRoles.STATE &&
      state.toLowerCase() !== userState.toLowerCase()
    ) {
      return 403;
    }
  }
  return 200;
};

export const eventValidator = (
  event: APIGatewayProxyEvent,
  operationType: String
) => {
  if (
    !event.pathParameters ||
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.headers.user_role ||
    (operationType !== "LIST" && !event.pathParameters.coreSet)
  )
    return 400;

  return authErrorHandler(
    event.pathParameters.state,
    // @ts-ignore
    event.headers.user_state,
    event.headers.user_role,
    operationType
  );
};

export const measureEventValidator = (
  event: APIGatewayProxyEvent,
  operationType: String
) => {
  if (
    !event.pathParameters ||
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet ||
    !event.headers.user_role ||
    (operationType !== "LIST" && !event.pathParameters.measure) ||
    (operationType === "POST" && !event.body)
  )
    return 400;

  return authErrorHandler(
    event.pathParameters.state,
    // @ts-ignore
    event.headers.user_state,
    event.headers.user_role,
    operationType
  );
};
