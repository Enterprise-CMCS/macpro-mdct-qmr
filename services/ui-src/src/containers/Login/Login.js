import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import { useSelector } from "react-redux";
import LocalLogins from "../../components/LocalLogins";

export default function Login() {
  const isAuthenticated = useSelector((state) => {
    if (state.user.attributes) {
      return true;
    }
    return false;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      window.location.href = "/";
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  //This variable will be used to set the hidden property of the developer-login form
  //If the environment is not PROD and is not VAL, the developer login will be shown
  let development = true;
  if (window.location.hostname.includes("cms.gov")) {
    development = false;
  }

  return (
    <div
      className="login-wrapper react-transition flip-in-y text-center"
      data-testid="Login"
    >
      <br />
      <br />
      <h3> Login (Cognito)</h3>
      <section className="ds-l-container preview__grid">
        <div className="ds-l-row ds-u-justify-content--leftt ds-u-padding--1 ds-u-margin-y--2">
          <div className="ds-l-col--7">
            <form
              onSubmit={handleSubmit}
              className="developer-login text-center"
              hidden={!development}
            >
              <FormGroup controlId="email" bsSize="large">
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={fields.email}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  value={fields.password}
                  onChange={handleFieldChange}
                  className="form-input"
                />
              </FormGroup>
              <div className="padding-y--7" style={{ paddingLeft: 326 }}>
                <LoaderButton
                  type="submit"
                  isLoading={isLoading}
                  disabled={!validateForm()}
                >
                  Login
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    className="margin-left-2"
                  />
                </LoaderButton>
              </div>
            </form>
          </div>
        </div>
      </section>
      <br />
      <br />
      {!isAuthenticated ? <LocalLogins /> : ""}
    </div>
  );
}
