export const determineRole = (specRole = []) => {
  let role;
  if (!specRole) {
    return "";
  }
  if (specRole.includes("mdctqmr-bor")) {
    role = "BUSINESS_USER";
  } else if (specRole.includes("mdctqmr-approver")) {
    role = "APPROVER";
  } else if (specRole.includes("mdctqmr-help-desk")) {
    role = "HELPDESK";
  } else if (specRole.includes("mdctqmr-state-user")) {
    role = "STATE_USER";
  }
  return role;
};

export const roles = {
  businessOwner: "BUSINESS_OWNER",
  approver: "APPROVER",
  stateUser: "STATE_USER",
};
