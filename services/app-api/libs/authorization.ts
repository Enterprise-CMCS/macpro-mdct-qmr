import { APIGatewayProxyEvent } from "aws-lambda";
import jwt_decode from "jwt-decode";
import { UserRoles, RequestMethods } from "../types";

interface DecodedToken {
  "custom:cms_roles": string;
  "custom:cms_state"?: string;
  given_name?: string;
  family_name?: string;
  identities?: [{ userId?: string }];
}

export const isAuthorized = (event: APIGatewayProxyEvent) => {
  let isAuthorized;
  if (event?.headers?.["x-api-key"]) {
    try {
      // decode the idToken
      isAuthorized = jwt_decode(event.headers["x-api-key"]) as DecodedToken;
    } catch {
      // verification failed - unauthorized
      isAuthorized = false;
    }
  }
  return !!isAuthorized;
};

export const hasPermissions = (
  event: APIGatewayProxyEvent,
  allowedRoles: UserRoles[]
) => {
  let isAllowed = false;
  // decode the idToken
  if (event?.headers["x-api-key"]) {
    const decoded = jwt_decode(event.headers["x-api-key"]) as DecodedToken;
    const idmUserRoles = decoded["custom:cms_roles"];
    const qmrUserRole = idmUserRoles
      ?.split(",")
      .find((role) => role.includes("mdctqmr")) as UserRoles;
    // determine if role has permissions
    if (allowedRoles.includes(qmrUserRole)) {
      isAllowed = true;
    }
  }
  return isAllowed;
};

export const getUserNameFromJwt = (event: APIGatewayProxyEvent) => {
  let userName = "branchUser";
  if (!event?.headers || !event.headers?.["x-api-key"]) return userName;

  const decoded = jwt_decode(event.headers["x-api-key"]) as DecodedToken;

  if (decoded["given_name"] && decoded["family_name"]) {
    userName = `${decoded["given_name"]} ${decoded["family_name"]}`;
    return userName;
  }

  if (decoded.identities && decoded.identities[0]?.userId) {
    userName = decoded?.identities[0].userId;
    return userName;
  }

  return userName;
};
