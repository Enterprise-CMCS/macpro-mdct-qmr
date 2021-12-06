import { FormProvider, useForm } from "react-hook-form";

interface Props {
  children: JSX.Element;
}

export const TestWrapper = ({ children }: Props) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
};
