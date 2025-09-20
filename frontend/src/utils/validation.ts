import { ZodError } from "zod";

export const getErrorMessageFromZod = (errors: ZodError): string => {
  return errors.issues[0]?.message || "Invalid input";
};
