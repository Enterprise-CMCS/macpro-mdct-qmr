import { useHistory } from "react-router-dom";
import * as Bootstrap from "react-bootstrap";
import * as Libs from "libs";

export function LocalLogins(): JSX.Element {
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
    Libs.loginLocalUser(alice);

    const redirectRoute = Libs.getRedirectRoute(role);
    history.push(redirectRoute);
  }
  return (
    <div>
      <h3>Local Login</h3>
      {Object.values(Libs.roles).map((r) => (
        <LoginAsButton key={r} role={r} handleSelect={localLogin} />
      ))}
    </div>
  );
}

function LoginAsButton({ role, handleSelect }: LoginAsButtonProps) {
  const { roles } = Libs;
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
    case roles.helpDesk:
      label = "Login as a Help Desk";
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

interface LoginAsButtonProps {
  role: string;
  handleSelect: Function;
}
