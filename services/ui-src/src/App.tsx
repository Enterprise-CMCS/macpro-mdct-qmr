import { AppRoutes } from "./Routes";
import * as QMR from "components";
import { LocalLogins, PostLogoutRedirect } from "components";
import { useUser } from "hooks/authHooks";
import { Suspense } from "react";
import { MeasuresLoading } from "views";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const { logout, user, showLocalLogins, loginWithIDM } = useUser();

  const authenticatedRoutes = (
    <>
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
    </>
  );

  return (
    <div id="app-wrapper">
      <Routes>
        <Route path="*" element={authenticatedRoutes} />
        <Route path="postLogout" element={<PostLogoutRedirect />} />
      </Routes>
    </div>
  );
};

export default App;
