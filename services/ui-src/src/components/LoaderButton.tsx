import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
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
