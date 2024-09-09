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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { formState } = useForm();

  const submitHandler = async (
    data: LoginFormData,
    setError: UseFormSetError<LoginFormData>
  ) => {
    try {
      const res = await axios.post("http://localhost:3025/auth/login", data);
      const { errors = {} } = res.data;

      console.log(res.data);

      const token = res.data;
      //TODO: store with cookie
      localStorage.setItem("token", token);

      //Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, LoginValidFieldNames> = {
        username: "username",
        password: "password",
      };

      //Find the first field with an error in the response data
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
      console.log(errors);

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
    <Flex bg="gray.200" align="center" justify="center" h="100vh" w="100vw">
      <Box bg="white" p={6} rounded="md" w={{ base: "90%", md: "40%" }}>
        <Heading as="h1" fontSize="4xl" mb={0}>
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
