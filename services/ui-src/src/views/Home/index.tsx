import { Navigate } from "react-router-dom";
import { CognitoUser } from "@aws-amplify/auth";
import { UserRoles } from "types";
import config from "config";
import * as CUI from "@chakra-ui/react";
import "./index.module.scss";
import * as QMR from "components";

interface Props {
  user?: CognitoUser;
}

export function Home({ user }: Props): JSX.Element {
  // this is absolutely the wrong way to do this. So its just a placeholder for now
  // @ts-ignore
  const role = user?.signInUserSession?.idToken?.payload?.["custom:cms_roles"];
  if (role === UserRoles.HELP || role === UserRoles.ADMIN) {
    return <Navigate to={`/admin`} />;
  }
  // this is absolutely the wrong way to do this. So its just a placeholder for now
  // @ts-ignore
  const state = user?.signInUserSession?.idToken?.payload?.["custom:cms_state"];
  if (!state) {
    return (
      <CUI.Box data-testid="Home-Container">
        <QMR.Notification
          alertStatus="error"
          alertTitle="You are not authorized to view this page"
        />
      </CUI.Box>
    );
  }
  return <Navigate to={`/${state}/${config.currentReportingYear}`} />;
}
