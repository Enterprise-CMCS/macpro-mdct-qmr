import jwt_decode from "jwt-decode";
import { APIGatewayProxyEvent, UserRoles } from "../types";

interface DecodedToken {
  "custom:cms_roles": string;
  "custom:cms_state"?: string;
  given_name?: string;
  family_name?: string;
  identities?: [{ userId?: string }];
}

export const isAuthenticated = (event: APIGatewayProxyEvent) => {
  let authed;
  if (event?.headers?.["x-api-key"]) {
    authed = jwt_decode(event.headers["x-api-key"]) as DecodedToken;
  }
  return !!authed;
};

export const hasRolePermissions = (
  event: APIGatewayProxyEvent,
  allowedRoles: UserRoles[]
) => {
  let hasPermissions = false;
  if (event?.headers["x-api-key"]) {
    // decode the idToken
    const decoded = jwt_decode(event.headers["x-api-key"]) as DecodedToken;
    const idmUserRoles = decoded["custom:cms_roles"];
    const qmrUserRole = idmUserRoles
      ?.split(",")
      .find((role) => role.includes("mdctqmr")) as UserRoles;

    // determine if role has permissions
    if (allowedRoles.includes(qmrUserRole)) {
      hasPermissions = true;
    }
  }
  return hasPermissions;
};

export const hasStatePermissions = (event: APIGatewayProxyEvent) => {
  let hasPermissions = false;
  if (event?.headers["x-api-key"]) {
    // decode the idToken
    const decoded = jwt_decode(event.headers["x-api-key"]) as DecodedToken;

    // get user role
    const idmUserRoles = decoded["custom:cms_roles"];
    const qmrUserRole = idmUserRoles
      ?.split(",")
      .find((role) => role.includes("mdctqmr")) as UserRoles;
    const isStateUser = qmrUserRole === UserRoles.STATE_USER;

    // get passed state parameter
    const requestState = event.pathParameters?.state;
    if (requestState) {
      // determine if user has state permissions
      const userState = decoded["custom:cms_state"];
      if (isStateUser && userState) {
        hasPermissions = userState.toLowerCase() === requestState.toLowerCase();
      }
    }
  }

  return hasPermissions;
};

export const getUserNameFromJwt = (event: APIGatewayProxyEvent) => {
  let userName = "branchUser";
  if (!event?.headers || !event.headers["x-api-key"]) return userName;

  const decoded = jwt_decode(event.headers["x-api-key"]) as DecodedToken;

  if (decoded["given_name"] && decoded["family_name"]) {
    userName = `${decoded["given_name"]} ${decoded["family_name"]}`;
    return userName;
  }

  if (decoded.identities && decoded.identities[0]?.userId) {
    userName = decoded.identities[0].userId;
    return userName;
  }

  return userName;
};
