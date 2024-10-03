import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { useState } from "react";
import { InputFieldProps } from "../../types";

//TODO: Combine with InputField?

const PasswordField: React.FC<InputFieldProps> = ({
  label,
  name,
  register,
  error,
  required,
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup size="md">
        <Input
          id={name}
          type={show ? "text" : "password"}
          variant="outline"
          {...register(name)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleClick}
            variant="solid"
            colorScheme="purple"
          >
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordField;
