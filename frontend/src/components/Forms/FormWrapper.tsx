import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, VStack, Text } from "@chakra-ui/react";
import { FormWrapperProps } from "../../types";
import React from "react";

const FormWrapper = ({
  schema,
  onSubmit,
  fields,
  submitButtonText,
}: FormWrapperProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (data: any) => onSubmit(data, setError);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {errors?.root?.serverError && (
        <Text color="red.600" mt={2}>
          {errors.root.serverError.message}
        </Text>
      )}
      <VStack spacing={6} align="flex-start">
        {typeof fields === "function"
          ? fields(register, errors)
          : React.Children.map(fields, (child) =>
              React.cloneElement(child as React.ReactElement, {
                register,
                errors,
              })
            )}

        <Button
          type="submit"
          isLoading={isSubmitting}
          colorScheme="purple"
          width="full"
        >
          {submitButtonText}
        </Button>
      </VStack>
    </form>
  );
};

export default FormWrapper;
