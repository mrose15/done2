
import './App.css';
import { Box, Button, ChakraProvider, Input, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleClick = async () => {
    const resp = await axios.post('http://localhost:3025/name', {
      name,
  });
    console.log("Response: ", resp.data); 
  }

  return (
     <ChakraProvider>
      <Box m={10} display="flex">
        <FormControl id="enterName">
          <FormLabel>Enter name
            <Input value={name} onChange={handleChange} />
          </FormLabel>
        </FormControl>
        <Button m={6} colorScheme="purple" onClick={handleClick}>Add Name</Button>
      </Box>
      </ChakraProvider>   
  )
}

export default App
