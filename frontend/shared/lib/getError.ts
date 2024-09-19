import { curry, prop } from "rambda";
import { FieldErrors } from "react-hook-form";

export const getErrorMessage = curry(
  (errors: FieldErrors<Record<string, unknown>>, field: string) => prop("message", errors[field])
);
