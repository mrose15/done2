import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Container, Heading, Box, Button, Text, Flex } from "@chakra-ui/react";
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

  console.log(data);

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
      <Flex mt={10}>
        <Box>Photo Goes here</Box>
        <Box>
          <EditableFields label="First Name" data={data.firstName} />
          <EditableFields label="Last Name" data={data.lastName} />
          <EditableFields label="Username" data={data.username} />
        </Box>
      </Flex>
      <Button onClick={logoutHandler}>Logout</Button>
    </Container>
  );
};

export default Profile;
