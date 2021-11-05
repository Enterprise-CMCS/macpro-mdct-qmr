import { Button } from "@trussworks/react-uswds";
import "components/LoaderButton/LoaderButton.scss";
import { ILoaderButtonProps } from "components/LoaderButton/ILoaderButtonProps";

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}: ILoaderButtonProps): JSX.Element {
  return (
    <Button
      className="login-button"
      disabled={disabled || isLoading}
      {...props}
      data-testid="LoaderButton"
      type="button"
    >
      {props.children}
      {isLoading && (
        <img
          src="preloaders/spheres.gif"
          alt="Loading... Please wait..."
          title="Loading... Please wait..."
          className="display-inline"
        />
      )}
    </Button>
  );
}
