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
}) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup size="md">
        <Input id={name} type={type} variant="filled" {...register(name)} />
      </InputGroup>

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordField;
