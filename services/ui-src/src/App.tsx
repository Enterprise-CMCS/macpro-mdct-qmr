import { AppRoutes } from "./Routes";
import * as QMR from "components";
import { LocalLogins } from "components";
import { useUser } from "hooks/authHooks";
import { Suspense } from "react";
import { MeasuresLoading } from "views";

const App = () => {
  const { logout, user, showLocalLogins, loginWithIDM } = useUser();

  return (
    <div id="app-wrapper">
      {user && (
        <>
          <QMR.ScrollToTop />
          <QMR.Header handleLogout={logout} />
          <Suspense fallback={MeasuresLoading()}>
            <AppRoutes />
          </Suspense>
          <QMR.Footer />
        </>
      )}
      {!user && showLocalLogins && <LocalLogins loginWithIDM={loginWithIDM} />}
    </div>
  );
};

export default App;
