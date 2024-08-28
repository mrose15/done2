import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Outlet />
    </ChakraProvider>
  );
}

export default App;
