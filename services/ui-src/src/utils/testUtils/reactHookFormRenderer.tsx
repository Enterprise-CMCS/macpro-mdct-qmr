import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { createStandaloneToast } from "@chakra-ui/toast";

const { ToastContainer } = createStandaloneToast();

interface WrapperProps {
  children: ReactNode;
}

interface AdditionalOptions {
  defaultValues?: Object;
}

export const renderWithHookForm = (
  ui: any,
  { defaultValues = {} }: AdditionalOptions = {}
) => {
  const Wrapper = ({ children }: WrapperProps) => {
    const methods = useForm({ defaultValues });

    return (
      <FormProvider {...methods}>
        {children}
        <ToastContainer />
      </FormProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};
