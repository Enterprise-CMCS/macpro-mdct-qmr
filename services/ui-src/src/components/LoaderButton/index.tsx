import { ContainedButton } from "components/ContainedButton";
import "./index.module.scss";

export function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}: ILoaderButtonProps): JSX.Element {
  return (
    <ContainedButton
      disabledStatus={disabled || isLoading}
      {...props}
      data-testid="LoaderButton"
      buttonText={
        <>
          {props.children}
          {isLoading && (
            <img
              src="preloaders/spheres.gif"
              alt="Loading... Please wait..."
              title="Loading... Please wait..."
              className="display-inline"
            />
          )}
        </>
      }
    />
  );
}

export interface ILoaderButtonProps {
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  block?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}
