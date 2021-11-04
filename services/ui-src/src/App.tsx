import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "App.scss";
import Routes from "Routes";
import { AppContext } from "libs/contextLib";
import { determineRole } from "libs/authHelpers";
import { Auth } from "aws-amplify";
import { logoutLocalUser } from "libs/user";
import { useDispatch } from "react-redux";
import { setUser, unsetUser } from "store/actions/userActions";
import Header from "components/Header";
import Footer from "components/Footer";

function App(): JSX.Element | null  {
  const dispatch = useDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated]= useState<boolean>(false);
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
      <div id="app-wrapper">
        <Header
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
