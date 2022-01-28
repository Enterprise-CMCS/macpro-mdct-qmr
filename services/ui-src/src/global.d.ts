import { RegisterOptions } from "react-hook-form";
declare module "*.scss";
interface ControllerRules {
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}
