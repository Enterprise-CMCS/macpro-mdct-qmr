export interface LoaderButtonProps {
    isLoading: boolean;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    block: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
}