import { AppRoutes } from "./Routes";
import * as QMR from "components";
import { LocalLogins } from "components";
import { useUser } from "hooks/authHooks";
import * as CUI from "@chakra-ui/react";

export let timeouts: any = [];

const App = () => {
  const { logout, user, showLocalLogins, loginWithIDM } = useUser();

  const toast = CUI.useToast();
  if (toast.isActive("timeoutToast")) {
    toast.closeAll();
  }

  return (
    <div id="app-wrapper">
      {user && (
        <>
          <QMR.ScrollToTop />
          <QMR.Header handleLogout={logout} />
          <AppRoutes />
          <QMR.Footer />
        </>
      )}
      {!user && showLocalLogins && <LocalLogins loginWithIDM={loginWithIDM} />}
    </div>
  );
};

export default App;
