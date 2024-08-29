import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
