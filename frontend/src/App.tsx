
import './App.css';
import { Box, Button, ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const handleClick = async () => {
    const resp = axios.get('http://localhost:3025');
    console.log(resp); 
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
