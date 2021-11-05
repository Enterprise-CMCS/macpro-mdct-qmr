import { Button } from "react-bootstrap";
import "components/LoaderButtons.scss";
import { ILoaderButtonProps } from "components/LoaderButton/ILoaderButtonProps";

// Todo Glyphicon no longer works in this component we need to fix the loading icon
export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}: ILoaderButtonProps): JSX.Element {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {props.children}
    </Button>
  );
}
