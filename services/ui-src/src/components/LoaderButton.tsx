import React from "react";
import { Button } from "react-bootstrap";
import Glyphicon from 'react-bootstrap/lib/Glyphicon'
import "@/src/components/LoaderButtons.scss";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}): JSX.Element  {
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
