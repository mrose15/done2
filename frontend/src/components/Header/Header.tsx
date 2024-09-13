import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import logo from "/logo.svg";

/*
TODO: 
- if user is logged in, show only profile and logout
- if user is not logged in, show only login and signup
*/

const pages = [
  { name: "Projects", path: "/projects" },
  { name: "Profile", path: "/profile" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signup" },
];

const Header = () => {
  return (
    <Box
      as="header"
      px={10}
      pt={8}
      pb={10}
      display="flex"
      justifyContent="space-between"
    >
      <Flex display="flex" direction="column" align="flex-start" gap={2}>
        <Image src={logo} alt="Done2 logo" color="black" width="150px" />
        <Text fontSize="lg" color="purple.500">
          Project Planner
        </Text>
      </Flex>
      <Box as="nav" display="flex" gap={5} mt={6}>
        {pages.map((page) => (
          <ChakraLink key={page.name} as={ReactRouterLink} to={page.path}>
            {page.name}
          </ChakraLink>
        ))}
      </Box>
    </Box>
  );
};

export default Header;
