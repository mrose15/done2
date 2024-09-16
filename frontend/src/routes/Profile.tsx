import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Heading, Box, Button } from "@chakra-ui/react";
import { Context } from "../types";

const Profile = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const context = useOutletContext<Context>();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    context.toggleLoggedIn();
    navigate("/login");
  };

  return (
    <Box>
      <Heading as="h1" fontSize="4xl" mb={0}>
        Profile
      </Heading>
      <Button onClick={logoutHandler}>Logout</Button>
    </Box>
  );
};

export default Profile;
