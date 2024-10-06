import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import {
  Container,
  Heading,
  Box,
  Button,
  Text,
  Flex,
  Avatar,
} from "@chakra-ui/react";
import EditableFields from "../components/Forms/EditableFields";
import { Context } from "../types";

type Data = {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
};

const Profile = () => {
  const data = useLoaderData() as Data;
  const navigate = useNavigate();
  const context = useOutletContext<Context>();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    context.toggleLoggedIn();
    navigate("/login");
  };

  return (
    <Container maxW={{ base: "100%", md: "4xl" }} px={{ base: 10 }}>
      <Heading as="h1" fontSize="3xl" mb={0}>
        Profile
      </Heading>
      <Text>Welcome, {data.firstName}!</Text>
      <Flex mt={10} gap={10}>
        <Box display="flex" alignItems="center">
          <Avatar
            bg="blue.400"
            size="2xl"
            name={`${data.firstName} ${data.lastName}`}
          />
        </Box>
        <Box flex="1 auto">
          <EditableFields
            label="First Name"
            value={data.firstName}
            username={data.username}
            field="firstName"
          />
          <EditableFields
            label="Last Name"
            value={data.lastName}
            username={data.username}
            field="lastName"
          />
          <EditableFields
            label="Username"
            value={data.username}
            username={data.username}
            field="username"
          />
          <EditableFields
            label="Password"
            value="*********"
            username={data.username}
            field="password"
          />
        </Box>
      </Flex>
      <Flex mt={10} gap={10} justify="center">
        <Button onClick={logoutHandler}>Logout</Button>
        <Button onClick={() => {}}>Delete Account</Button>
      </Flex>
    </Container>
  );
};

export default Profile;
