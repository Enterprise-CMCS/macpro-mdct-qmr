import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import { loginLocalUser } from "./libs/user";
import config from "./config";
import { useDispatch } from "react-redux";
import { setUser, unsetUser } from "./store/actions/userActions";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  const dispatch = useDispatch();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();

    // Remove user from redux
    dispatch(unsetUser());
    userHasAuthenticated(false);

    history.push("/");
  }

  async function handleLogin() {
    try {
      const localLogin = config.LOCAL_LOGIN === "true";
      if (localLogin) {
        const alice = {
          username: "alice",
          attributes: {
            given_name: "Alice",
            family_name: "Foo",
            email: "alice@example.com",
          },
        };
        loginLocalUser(alice);

        // Add user to redux
        dispatch(setUser(alice));
        userHasAuthenticated(true);
      } else {
        const authConfig = Auth.configure();
        const { domain, redirectSignIn, responseType } = authConfig.oauth;
        const clientId = authConfig.userPoolWebClientId;
        const url = `https://${domain}/oauth2/authorize?redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
        window.location.assign(url);
      }
    } catch (e) {
      onError(e);
    }
  }

  return (
    !isAuthenticating && (
      <div className="">
        <Header isAuthenticated={isAuthenticated} handleLogin={() => handleLogin()} handleLogout={() => handleLogout()}/>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
          <Footer/>
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
