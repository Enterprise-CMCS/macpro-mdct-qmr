import { roles } from "./authHelpers";
export const getRedirectRoute = (role) => {
  let redirectRoute = "/";
  switch (role) {
    case roles.approver:
      redirectRoute = "/adminhome";
      break;
    case roles.businessOwner:
      redirectRoute = "/bohome";
      break;
    case roles.stateUser:
      redirectRoute = "/statehome";
      break;
    default:
      redirectRoute = "/";
      break;
  }
  return redirectRoute;
};
