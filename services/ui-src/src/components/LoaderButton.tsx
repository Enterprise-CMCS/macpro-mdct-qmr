import React from "react";
import { Button } from "react-bootstrap";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import "components/LoaderButtons.scss";
import { ILoaderButtonProps } from "components/LoaderButton/ILoaderButtonProps";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}: ILoaderButtonProps): JSX.Element  {
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
