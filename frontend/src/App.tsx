
import './App.css';
import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const handleClick = async () => {
    const resp = await axios.post('http://localhost:3025/name', {name: "Michele"});
    console.log("Response: ", resp.data); 
  }

  return (
     <ChakraProvider>
      <Box>
        HI FROM APP
        </Box>
        <Button colorScheme="purple" onClick={handleClick}>Button</Button>
      </ChakraProvider>   
  )
}

export default App
