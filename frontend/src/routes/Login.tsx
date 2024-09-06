import {
  Box,
  Button,
  chakra,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import InputField from "../components/Forms/InputField";
import PasswordField from "../components/Forms/PasswordField";

import { useForm } from "react-hook-form";
import { FormData, UserSchema, ValidFieldNames } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(UserSchema),
  });

  const submitHandler = async (data: FormData) => {
    console.log("username", data.username);
    console.log("password", data.password);
    console.log("data", data);
    try {
      const res = await axios.post("http://localhost:3025/auth/login", data);
      const { errors = {} } = res.data; // Destructure the 'errors' property from the response data

      const token = res.data;
      //TODO: store with cookie
      localStorage.setItem("token", token);

      //Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        username: "username",
        password: "password",
      };

      //Find the first field with an error in the response data
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

      navigate("/projects");
    } catch (error) {
      const errors = (error as any)?.response.data;

      if (errors.statusCode > 200) {
        setError("root.serverError", {
          type: errors.statusCode,
          message:
            "There was an error logging in. Please check your username and password and try again.",
        });
      }

      if (errors.message.includes("username")) {
        setError("username", {
          type: "server",
          message: "Username is incorrect",
        });
      }

      if (errors.message.includes("password")) {
        setError("password", {
          type: "server",
          message: "Password is incorrect",
        });
      }
    }
  };

  return (
    <Flex bg="gray.200" align="center" justify="center" h="100vh" w="100vw">
      <Box bg="white" p={6} rounded="md" w={{ base: "90%", md: "40%" }}>
        <Heading as="h1" fontSize="4xl" mb={0}>
          Log in
        </Heading>
        <Text fontSize="sm" mb={3}>
          <chakra.span color="red.600">*</chakra.span> Indicates Required Field
        </Text>

        {errors?.root?.serverError?.type === 400 && (
          <Text fontSize="sm" mb={3} color="red.600">
            {errors?.root.serverError.message}
          </Text>
        )}

        <form
          onSubmit={handleSubmit((stuff) => {
            console.log("Form submitted", stuff);
            submitHandler(stuff);
          })}
        >
          <VStack spacing={6} align="flex-start">
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
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
