import React from "react";
import { useDispatch } from "react-redux";
import { loginLocalUser } from "libs/user";
import { setUser } from "store/actions/userActions";
import { roles } from "libs/authHelpers";
import { useHistory } from "react-router-dom";
import { getRedirectRoute } from "libs/routeHelpers";
import * as Bootstrap from "react-bootstrap";
import { LoginAsButtonProps } from "components/LocalLogins/LoginAsButtonsProps";

function LocalLogins(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();
  function localLogin(role: string) {
    const alice = {
      username: "alice",
      attributes: {
        given_name: "Alice",
        family_name: "Foo",
        email: "alice@example.com",
        "custom:cms_roles": role,
      },
    };
    loginLocalUser(alice);

    // Add user to redux
    dispatch(setUser(alice));
    const redirectRoute = getRedirectRoute(role);
    history.push(redirectRoute);
  }
  return (
    <div>
      <h3>Local Login</h3>
      {Object.values(roles).map((r) => (
        <LoginAsButton key={r} role={r} handleSelect={localLogin} />
      ))}
    </div>
  );
}

function LoginAsButton({ role, handleSelect }: LoginAsButtonProps) {
  let label;
  switch (role) {
    case roles.approver:
      label = "Login as an Admin";
      break;
    case roles.businessOwner:
      label = "Login as a BO";
      break;
    case roles.stateUser:
      label = "Login as a State user";
      break;
    default:
      label = "";
      break;
  }
  return (
    <Bootstrap.Button
      variant="outline-primary"
      className="me-2 mb-2"
      onClick={() => handleSelect(role)}
    >
      {label}
    </Bootstrap.Button>
  );
}
export default LocalLogins;
