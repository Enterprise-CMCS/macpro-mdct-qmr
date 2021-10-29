import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "@/src/components/LoaderButton/LoaderButton";
import { useFormFields } from "@/src/libs/hooksLib";
import { onError } from "@/src/libs/errorLib";
import "@/src/containers/Long.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons/faSignInAlt";
import { useSelector } from "react-redux";
import LocalLogins from "@/src/components/LocalLogins/LocalLogins";

export default function Login() {
  const isAuthenticated = useSelector((state) => state.user.attributes);
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
  });
  const validateForm = () =>
    fields.email.length > 0 && fields.password.length > 0;
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
              { isLoading, fields }
            )}
          </div>
        </div>
      </section>
      {!isAuthenticated ? <LocalLogins /> : ""}
    </div>
  );
}
function renderLoginForm(functions, params) {
  return (
    <form
      onSubmit={functions.handleSubmit}
      className="developer-login text-center"
    >
      <FormInput
        label="Email"
        type="email"
        value={params.fields.email}
        handleFieldChange={functions.handleFieldChange}
      />
      <FormInput
        label="Password"
        type="password"
        value={params.fields.password}
        handleFieldChange={functions.handleFieldChange}
      />
      <div style={{ paddingLeft: 326 }}>
        <LoaderButton
          type="submit"
          isLoading={params.isLoading}
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
