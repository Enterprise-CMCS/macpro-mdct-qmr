export interface ILoginFormProps {
    isLoading: boolean;
    fields: {
      password: string;
      email: string
    };
    handleSubmit: Function;
    handleFieldChange: Function;
    validateForm: Function;
  }