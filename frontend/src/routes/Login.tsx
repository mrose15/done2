import { Heading, Box, Flex, Text, chakra } from "@chakra-ui/react";
import FormWrapper from "../components/Forms/FormWrapper";
import InputField from "../components/Forms/InputField";
import PasswordField from "../components/Forms/PasswordField";
import { LoginFormData, LoginSchema, LoginValidFieldNames } from "../types";
import {
  useForm,
  UseFormSetError,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../types";

const Login = () => {
  const navigate = useNavigate();
  const { formState } = useForm<LoginFormData>();
  const context = useOutletContext<Context>();

  const submitHandler = async (
    data: LoginFormData,
    setError: UseFormSetError<LoginFormData>
  ) => {
    try {
      const res = await axios.post("http://localhost:3025/auth/login", data);
      const { errors = {} } = res.data;

      const token = res.data;
      //TODO: store with cookie
      localStorage.setItem("token", token);
      context.toggleLoggedIn();

      const fieldErrorMapping: Record<string, LoginValidFieldNames> = {
        username: "username",
        password: "password",
      };

      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );

      if (fieldWithError) {
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }

      navigate("/projects");
    } catch (error) {
      const errors = error?.response.data;

      if (errors.statusCode > 200) {
        setError("root.serverError", {
          type: errors.statusCode,
          message: "Check your username and password",
        });
      }
    }
  };

  const formFields = (
    register: UseFormRegister<LoginFormData>,
    errors: FieldErrors<LoginFormData>
  ) => (
    <>
      <InputField
        name="username"
        type="text"
        label="Username"
        id="username"
        required={true}
        register={register}
        error={errors.username}
      />
      <PasswordField
        name="password"
        label="Password"
        id="password"
        required={true}
        register={register}
        error={errors.password}
      />
    </>
  );

  return (
    <Flex
      bg="white"
      align="center"
      direction="column"
      justify="flex-start"
      h="100vh"
      w="100%"
    >
      <Box
        bg="white"
        p={6}
        mt={20}
        rounded="md"
        boxShadow="xl"
        w={{ base: "90%", md: "40%" }}
      >
        <Heading as="h1" fontSize="4xl" mb={6}>
          Log in
        </Heading>
        <Text fontSize="sm" mb={3}>
          <chakra.span color="red.600">*</chakra.span> Indicates Required Field
        </Text>

        {formState.errors.root?.serverError?.type === 400 && (
          <Text fontSize="sm" mb={3} color="red.600">
            {formState.errors.root.serverError.message}
          </Text>
        )}

        <FormWrapper
          schema={LoginSchema}
          onSubmit={submitHandler}
          fields={formFields}
          submitButtonText="Log In"
        />
      </Box>
    </Flex>
  );
};

export default Login;
