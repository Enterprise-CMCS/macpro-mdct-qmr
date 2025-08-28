import { AppRoutes } from "./Routes";
import * as QMR from "components";
import { LocalLogins, PostLogoutRedirect } from "components";
import { useUser } from "hooks/authHooks";
import { Suspense, useEffect } from "react";
import { MeasuresLoading } from "views";
import { Route, Routes, useLocation } from "react-router-dom";
import { fireTealiumPageView, makeMediaQueryClasses } from "utils";

const App = () => {
  const mqClasses = makeMediaQueryClasses();

  const { logout, user, showLocalLogins, loginWithIDM } = useUser();
  const { pathname, key } = useLocation();

  // fire tealium page view on route change
  useEffect(() => {
    fireTealiumPageView(user, window.location.href, pathname);
  }, [key, pathname, user]);

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
    <div id="app-wrapper" className={mqClasses}>
      <Routes>
        <Route path="*" element={authenticatedRoutes} />
        <Route path="postLogout" element={<PostLogoutRedirect />} />
      </Routes>
    </div>
  );
};

export default App;
