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
  if (
    !(userRole === UserRoles.ADMIN) &&
    !(userRole === UserRoles.STATE) &&
    !(userRole === UserRoles.HELP)
  ) {
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
  operationType: string
) => {
  if (!event.body) return 400;
  const { userRole, userState } = JSON.parse(event.body);
  if (
    !event.body ||
    !event.pathParameters ||
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !userRole ||
    (operationType !== "LIST" && !event.pathParameters.coreSet)
  )
    return 400;

  return authErrorHandler(
    event.pathParameters.state,
    userState,
    userRole,
    operationType
  );
};

export const measureEventValidator = (
  event: APIGatewayProxyEvent,
  operationType: string
) => {
  if (!event.body) return 400;
  const { userRole, userState } = JSON.parse(event.body);
  if (
    !event.pathParameters ||
    !event.pathParameters.state ||
    !event.pathParameters.year ||
    !event.pathParameters.coreSet ||
    !userRole ||
    (operationType !== "LIST" && !event.pathParameters.measure) ||
    (operationType === "POST" && !event.body)
  )
    return 400;

  return authErrorHandler(
    event.pathParameters.state,
    userState,
    userRole,
    operationType
  );
};
