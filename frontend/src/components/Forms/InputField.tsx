import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
} from "@chakra-ui/react";

import { FormFieldProps } from "../../types";

const PasswordField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  register,
  error,
  required,
}) => {
  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel htmlFor={name}>{label}</FormLabel>

      <Input id={name} type={type} variant="filled" {...register(name)} />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordField;
