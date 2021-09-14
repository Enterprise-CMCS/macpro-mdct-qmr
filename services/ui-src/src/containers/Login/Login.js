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
  const isAuthenticated = useSelector((state) => state.user.attributes);
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
  return (
    <div className="login-wrapper react-transition flip-in-y text-center">
      <h3 className="login-title"> Login (Cognito)</h3>
      <section className="ds-l-container preview__grid">
        <div className="ds-l-row ds-u-padding--1 ds-u-margin-y--2">
          <div className="ds-l-col--7">
            {renderLoginForm(
              { handleSubmit, handleFieldChange, validateForm },
              fields,
              isLoading
            )}
          </div>
        </div>
      </section>
      {!isAuthenticated ? <LocalLogins /> : ""}
    </div>
  );
}

function renderLoginForm(functions, fields, isLoading) {
  return (
    <form
      onSubmit={functions.handleSubmit}
      className="developer-login text-center"
    >
      <FormInput
        label="Email"
        type="email"
        value={fields.email}
        handleFieldChange={functions.handleFieldChange}
      />
      <FormInput
        label="Password"
        type="password"
        value={fields.password}
        handleFieldChange={functions.handleFieldChange}
      />
      <div style={{ paddingLeft: 326 }}>
        <LoaderButton
          type="submit"
          isLoading={isLoading}
          disabled={!functions.validateForm()}
        >
          Login
          <FontAwesomeIcon icon={faSignInAlt} className="margin-left-2" />
        </LoaderButton>
      </div>
    </form>
  );
}

function FormInput(props) {
  return (
    <FormGroup controlId={props.type} bsSize="large">
      <ControlLabel>{props.label}</ControlLabel>
      <FormControl
        type={props.type}
        value={props.value}
        onChange={props.handleFieldChange}
        className="form-input"
      />
    </FormGroup>
  );
}
