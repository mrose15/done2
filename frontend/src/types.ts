import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type FormFieldProps = {
  type: string;
  label: string;
  name: ValidFieldNames;
  id: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
};

export type PasswordFieldProps = {
  label: string;
  name: ValidFieldNames;
  id: string;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
};

export type ValidFieldNames =
  | "firstName"
  | "lastName"
  | "email"
  | "username"
  | "password";

export const UserSchema: ZodType<FormData> = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, { message: "Password is too short" }),
  //TODO:
  // add validation for password too short and is blank
  // add validation for if email is blank
});
