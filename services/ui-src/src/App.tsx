import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./Routes";
import * as QMR from "components";
import { LocalLogins, PostLogoutRedirect } from "components";
import { useUser } from "hooks/authHooks";
import { Suspense, useEffect } from "react";
import { MeasuresLoading } from "views";
import { Route, Routes, useLocation } from "react-router-dom";
import { fireTealiumPageView, makeMediaQueryClasses } from "utils";
import * as CUI from "@chakra-ui/react";

const App = () => {
  const mqClasses = makeMediaQueryClasses();

  const { logout, user, showLocalLogins, loginWithIDM, isLoading, authError } =
    useUser();
  const { pathname, key } = useLocation();

  // fire tealium page view on route change
  useEffect(() => {
    fireTealiumPageView(user, window.location.href, pathname);
  }, [key]);

  const authenticatedRoutes = (
    <>
      {isLoading && MeasuresLoading()}
      {!isLoading && user && (
        <>
          <QMR.SkipNav />
          <QMR.ScrollToTop />
          <QMR.Header handleLogout={logout} />
          <Suspense fallback={MeasuresLoading()}>
            <AppRoutes />
          </Suspense>
          <QMR.Footer />
        </>
      )}
      {!isLoading && !user && showLocalLogins && (
        <LocalLogins loginWithIDM={loginWithIDM} />
      )}
      {!isLoading && !user && !showLocalLogins && authError && (
        <CUI.Container maxW="md" py="12" textAlign="center">
          <CUI.Heading as="h1" size="lg" mb="4">
            We couldn't sign you in
          </CUI.Heading>
          <CUI.Text mb="6">
            Something went wrong while redirecting you to sign in. Please try
            again.
          </CUI.Text>
          <CUI.Button colorScheme="teal" onClick={() => loginWithIDM()}>
            Try Again
          </CUI.Button>
        </CUI.Container>
      )}
      {!isLoading &&
        !user &&
        !showLocalLogins &&
        !authError &&
        MeasuresLoading()}
    </>
  );

  return (
    <HelmetProvider>
      <div id="app-wrapper" className={mqClasses}>
        <Routes>
          <Route path="*" element={authenticatedRoutes} />
          <Route path="postLogout" element={<PostLogoutRedirect />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
};

export default App;
