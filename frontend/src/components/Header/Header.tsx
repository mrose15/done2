import { Box, Image, Flex, Container } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import logo from "/logo.svg";

/*
TODO: 
- if user is logged in, show only profile and logout
- if user is not logged in, show only login and signup
*/

const pages = [
  { name: "Projects", path: "/projects", showWhenLoggedIn: true },
  { name: "Profile", path: "/profile", showWhenLoggedIn: true },
  { name: "Login", path: "/login", showWhenLoggedIn: false },
  { name: "Sign Up", path: "/signup", showWhenLoggedIn: false },
];

type HeaderProps = {
  loggedIn: boolean;
};

const Header = ({ loggedIn }: HeaderProps) => {
  return (
    <Container maxW={{ base: "100%", md: "4xl" }} px={{ base: 10 }}>
      <Box
        as="header"
        pt={8}
        pb={10}
        display="flex"
        justifyContent="space-between"
      >
        <Flex display="flex" direction="column" align="flex-start" gap={2}>
          <Image src={logo} alt="Done2 logo" color="black" width="150px" />
        </Flex>
        <Box as="nav" display="flex" gap={5} mt={6}>
          {pages.map(
            (page) =>
              loggedIn === page.showWhenLoggedIn && (
                <ChakraLink key={page.name} as={ReactRouterLink} to={page.path}>
                  {page.name}
                </ChakraLink>
              )
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Header;
