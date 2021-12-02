import { useFormContext } from "react-hook-form";

export const useCustomRegister = (name: string) => {
  const { control } = useFormContext();
  return {
    name,
    control,
  };
};
