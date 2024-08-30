import {
  Heading,
  Box,
  Button,
  Flex,
  VStack,
  Text,
  chakra,
} from "@chakra-ui/react";

import InputField from "../components/Forms/InputField";
import PasswordField from "../components/Forms/PasswordField";

import { useForm } from "react-hook-form";
import { FormData, UserSchema, ValidFieldNames } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(UserSchema),
  });

  const submitHandler = async (data: FormData) => {
    try {
      const res = await axios.post("http://localhost:3025/auth/signup", data);
      const { errors = {} } = res.data; // Destructure the 'errors' property from the response data

      // Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        username: "username",
        password: "password",
      };

      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );

      // If a field with an error is found, update the form error state using setError
      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }

      reset();
    } catch (error) {
      console.error(error);
      alert("Submitting form failed!");
    }
  };

  return (
    <Flex bg="gray.200" align="center" justify="center" h="100vh" w="100vw">
      <Box bg="white" p={6} rounded="md" w={{ base: "90%", md: "40%" }}>
        <Heading as="h1" fontSize="4xl" mb={0}>
          Sign up
        </Heading>
        <Text mb={3}>Sign up for an account</Text>
        <Text fontSize="sm" mb={3}>
          <chakra.span color="red.600">*</chakra.span> Indicates Required Field
        </Text>
        <form onSubmit={handleSubmit(submitHandler)}>
          <VStack spacing={6} align="flex-start">
            <InputField
              name="firstName"
              type="text"
              label="First Name"
              register={register}
              error={errors.firstName}
              id="firstName"
              required={true}
            />

            <InputField
              name="lastName"
              type="text"
              label="Last Name"
              register={register}
              error={errors.lastName}
              id="lastName"
              required={true}
            />

            <InputField
              name="email"
              type="email"
              label="Email"
              register={register}
              error={errors.email}
              id="email"
              required={true}
            />

            <InputField
              name="username"
              type="text"
              label="Username"
              register={register}
              error={errors.username}
              id="username"
              required={true}
            />

            <PasswordField
              name="password"
              label="Password"
              register={register}
              error={errors.password}
              id="password"
              required={true}
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="purple"
              width="full"
            >
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
