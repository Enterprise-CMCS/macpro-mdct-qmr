import React from "react";
import { Button } from "react-bootstrap";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import "components/LoaderButtons.scss";
import { LoaderButtonProps } from "components/LoaderButton/LoaderButtonProps";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}: LoaderButtonProps): JSX.Element  {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}
