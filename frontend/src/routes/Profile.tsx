import { useLoaderData, useNavigate } from "react-router-dom";
import { Heading, Box, Button } from "@chakra-ui/react";

const Profile = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box>
      <Heading as="h1" fontSize="4xl" mb={0}>
        Log in
      </Heading>
      <Button onClick={logoutHandler}>Logout</Button>
    </Box>
  );
};

export default Profile;
