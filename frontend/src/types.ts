import {
  FieldError,
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";
import { z, ZodSchema } from "zod";

export type FormWrapperProps = {
  schema: ZodSchema;
  onSubmit: (data: any, setError: UseFormSetError<any>) => Promise<void>;
  fields: (
    | React.ReactElement
    | ((
        register: UseFormRegister<any>,
        errors: FieldErrors<any>
      ) => React.ReactElement)
  )[];
  submitButtonText: string;
};

export const UserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type FormData = z.infer<typeof UserSchema> & {
  required: boolean;
  error: FieldError | undefined;
  register: UseFormRegister<z.infer<typeof UserSchema>>;
};

export type LoginFormData = z.infer<typeof LoginSchema> & {
  required: boolean;
  error: FieldError | undefined;
  register: UseFormRegister<z.infer<typeof LoginSchema>>;
};

export type ValidFieldNames = keyof z.infer<typeof UserSchema>;

export type LoginValidFieldNames = keyof z.infer<typeof LoginSchema>;

export type InputFieldProps = {
  label: string;
  type?: string;
  id: string;
  name: string;
  required: boolean;
  register: UseFormRegister<any>;
  error: FieldError;
};

export type Context = {
  loggedIn: boolean;
  toggleLoggedIn: () => void;
};
