import { AppRoutes } from "./Routes";
import * as QMR from "components";
import { LocalLogins } from "components";
import { useUser } from "hooks/authHooks";

const App = () => {
  const { logout, user, showLocalLogins, loginWithIDM } = useUser();

  return (
    <div id="app-wrapper">
      {user && (
        <>
          <QMR.ScrollToTop />
          <QMR.Header handleLogout={logout} />
          <AppRoutes />
          <QMR.Footer />
          <QMR.SessionTimeout />
        </>
      )}
      {!user && showLocalLogins && <LocalLogins loginWithIDM={loginWithIDM} />}
    </div>
  );
};

export default App;
