import { Button } from "react-bootstrap";
import "components/LoaderButtons.scss";
import { ILoaderButtonProps } from "components/LoaderButton/LoaderButton";

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
      {isLoading ? "Loading..." : props.children}
    </Button>
  );
}
