import { Heading, Box, Flex, Text, chakra } from "@chakra-ui/react";
import FormWrapper from "../components/Forms/FormWrapper";
import InputField from "../components/Forms/InputField";
import PasswordField from "../components/Forms/PasswordField";
import { UserSchema, ValidFieldNames, FormData } from "../types";
import {
  useForm,
  UseFormSetError,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../types";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { formState } = useForm<FormData>();
  const context = useOutletContext<Context>();

  const submitHandler = async (
    data: FormData,
    setError: UseFormSetError<FormData>
  ) => {
    try {
      const res = await axios.post("http://localhost:3025/auth/signup", data);
      const { errors = {} } = res.data;

      const token = res.data;
      context.toggleLoggedIn();
      //TODO: store with cookie
      localStorage.setItem("token", token);

      //Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
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

      if (errors.statusCode > 200) {
        setError("root.serverError", {
          type: errors.statusCode,
          message: "Something has gone wrong",
        });
      }

      if (errors.message.includes("username")) {
        setError("username", {
          type: "server",
          message: "Username is taken",
        });
      }

      if (errors.message.includes("email")) {
        setError("email", {
          type: "server",
          message: "Email address is already in use",
        });
      }
    }
  };

  const formFields = (
    register: UseFormRegister<FormData>,
    errors: FieldErrors<FormData>
  ) => (
    <>
      <InputField
        name="firstName"
        type="text"
        label="First Name"
        id="firstName"
        required={true}
        register={register}
        error={errors.firstName}
      />
      <InputField
        name="lastName"
        type="text"
        label="Last Name"
        id="lastName"
        required={true}
        register={register}
        error={errors.lastName}
      />
      <InputField
        name="email"
        type="email"
        label="Email"
        id="email"
        required={true}
        register={register}
        error={errors.email}
      />
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
          Sign up
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
          schema={UserSchema}
          onSubmit={submitHandler}
          fields={formFields}
          submitButtonText="Sign up"
        />
      </Box>
    </Flex>
  );
};

export default Signup;
