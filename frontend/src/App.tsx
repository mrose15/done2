import "./App.css";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import { Outlet, useLoaderData } from "react-router-dom";
import theme from "./theme";
import { Context } from "./types";

type UserData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

function App() {
  const data = useLoaderData() as UserData | undefined;
  const [loggedIn, setLoggedIn] = useState(data?.username !== undefined);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  };

  const context: Context = {
    loggedIn,
    toggleLoggedIn,
  };

  return (
    <ChakraProvider theme={theme}>
      <Header loggedIn={loggedIn} />
      <Outlet context={context} />
    </ChakraProvider>
  );
}

export default App;
