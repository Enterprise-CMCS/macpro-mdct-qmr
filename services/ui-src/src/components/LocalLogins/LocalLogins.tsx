import React from "react";
import { useDispatch } from "react-redux";
import { loginLocalUser } from "@/src/libs/user";
import { setUser } from  "@/src/store/actions/userActions";
import { roles } from "@/src/libs/authHelpers";
import { useHistory } from "react-router-dom";
import { getRedirectRoute } from "@/src/libs/routeHelpers";
import "@/containers/Login/Login.scss";

function LocalLogins(): JSX.Element  {
  const dispatch = useDispatch();
  const history = useHistory();
  function localLogin(role) {
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
    <div className="local-login">
      <h3 className="local-login-title">Local Login</h3>
      <section className="ds-l-container preview__grid">
        {loginAs(roles.approver, localLogin)}
        {loginAs(roles.businessOwner, localLogin)}
        {loginAs(roles.stateUser, localLogin)}
      </section>
    </div>
  );
}
function loginAs(role, localLogin) {
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
    <div className="ds-l-row ds-u-justify-content--center ds-u-padding--1 ds-u-margin-y--2">
      <div className="ds-l-col--6">
        <button
          onClick={() => localLogin(role)}
          className="ds-c-button ds-c-button--primary"
        >
          {label}
        </button>
      </div>
    </div>
  );
}
export default LocalLogins;
