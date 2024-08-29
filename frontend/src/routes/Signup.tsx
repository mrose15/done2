import { Heading, Box, Button, Flex, VStack } from "@chakra-ui/react";

import InputField from "../components/Forms/InputField";
import PasswordField from "../components/Forms/PasswordField";

import { useForm } from "react-hook-form";
import { FormData, UserSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
  });

  //TODO: fix submit handler to use actual API call
  const submitHandler = async (data: FormData) => {
    await console.log(JSON.stringify(data, null, 2));
  };

  return (
    <Flex bg="gray.200" align="center" justify="center" h="100vh" w="100vw">
      <Box bg="white" p={6} rounded="md" w={{ base: "90%", md: "40%" }}>
        <Heading as="h1" fontSize="4xl">
          Sign up
        </Heading>
        <form onSubmit={handleSubmit(submitHandler)}>
          <VStack spacing={6} align="flex-start">
            <InputField
              name="firstName"
              type="text"
              label="First Name"
              register={register}
              error={errors.firstName}
              id="firstName"
            />

            <InputField
              name="lastName"
              type="text"
              label="Last Name"
              register={register}
              error={errors.lastName}
              id="lastName"
            />

            <InputField
              name="email"
              type="email"
              label="Email"
              register={register}
              error={errors.email}
              id="email"
            />

            <InputField
              name="username"
              type="text"
              label="Username"
              register={register}
              error={errors.username}
              id="username"
            />

            <PasswordField
              name="password"
              label="Password"
              register={register}
              error={errors.password}
              id="password"
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
