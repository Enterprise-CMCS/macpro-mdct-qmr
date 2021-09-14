import React from "react";
import { useDispatch } from "react-redux";
import { loginLocalUser } from "../libs/user";
import { setUser } from "../store/actions/userActions";
import { roles } from "../libs/authHelpers";
import { useHistory } from "react-router-dom";
import { getRedirectRoute } from "../libs/routeHelpers";

function LocalLogins() {
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
    <section className="ds-l-container preview__grid">
      <div className="ds-l-row ds-u-justify-content--center ds-u-padding--1 ds-u-margin-y--2">
        <div className="ds-l-col--6">
          <div>
            <h3>Local Login</h3>
          </div>
          <br />
          <button
            onClick={() => localLogin(roles.approver)}
            className="ds-c-button ds-c-button--primary"
          >
            Login as an Admin
          </button>
        </div>
      </div>

      <div className="ds-l-row ds-u-justify-content--center ds-u-padding--1 ds-u-margin-y--2">
        <div className="ds-l-col--6">
          <button
            onClick={() => localLogin(roles.stateUser)}
            className="ds-c-button ds-c-button--primary"
          >
            Login as a State User
          </button>
        </div>
      </div>

      <div className="ds-l-row ds-u-justify-content--center ds-u-padding--1 ds-u-margin-y--2">
        <div className="ds-l-col--6">
          <button
            onClick={() => localLogin(roles.businessOwner)}
            className="ds-c-button ds-c-button--primary"
          >
            Login as a BO
          </button>
        </div>
      </div>
    </section>
  );
}

export default LocalLogins;
