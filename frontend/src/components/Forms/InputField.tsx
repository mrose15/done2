import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

import { InputFieldProps } from "../../types";

const InputField: React.FC<InputFieldProps> = ({
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

      <Input id={name} type={type} variant="outline" {...register(name)} />

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
