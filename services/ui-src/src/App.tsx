import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "@/src/App.scss";
import Routes from "@/src/Routes";
import { AppContext } from "@/src/libs/contextLib";
import { determineRole } from "@/src/libs/authHelpers";
import { Auth } from "aws-amplify";
import { logoutLocalUser } from "@/src/libs/user";
import config from "@/src/config";
import { useDispatch } from "react-redux";
import { setUser, unsetUser } from "@/src/store/actions/userActions";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

function App(): JSX.Element | null  {
  const dispatch = useDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [, setLocalLogin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      let user;
      try {
        user = await Auth.currentAuthenticatedUser();
      } catch {
        setIsAuthenticating(false);
      }
      if (user) {
        const cmsRoleAttribute =
          user?.attributes ?? user?.signInUserSession?.idToken?.payload;
        if (!user.attributes) user.attributes = {};
        // *** make sure attributes exist and are in standard format
        user.attributes["app-role"] = determineRole(
          cmsRoleAttribute ? cmsRoleAttribute["custom:cms_roles"] : ""
        );
        dispatch(setUser(user));
        setIsAuthenticating(false);
        userHasAuthenticated(true);
        setLocalLogin(config.LOCAL_LOGIN === "true");
      }
      setIsAuthenticating(false);
    })();
  }, [dispatch]);

  async function handleLogout() {
    dispatch(unsetUser());
    userHasAuthenticated(false);
    logoutLocalUser();
    try {
      await Auth.signOut();
      // window.location.href = Auth.configure()?.oauth?.redirectSignOut; // !Typescript does not find this property will revisit
    } catch (error) {
      console.log("error signing out: ", error);
    }
    // Remove user from redux
    history.push("/");
  }
  
  return (
    !isAuthenticating ? (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          handleLogout={() => handleLogout()}
        />
        <AppContext.Provider
          value={{
            isAuthenticated,
            userHasAuthenticated,
          }}
        >
          <Routes />
          <Footer />
        </AppContext.Provider>
      </div>
    ) : null
  );
}

export default App;
