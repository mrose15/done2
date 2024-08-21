
import './App.css';
import { Box, Button, ChakraProvider, Input, FormControl, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  }

  const handleClick = async () => {
    const resp = await axios.post('http://localhost:3025/name', {
      firstName,
      lastName
  });
    setLastName("");
    setFirstName("");
  }

  return (
     <ChakraProvider>
      <Box m={10} display="flex">
        <FormControl id="enterFirstName">
          <FormLabel>First name
            <Input value={firstName} onChange={handleFirstNameChange} />
          </FormLabel>
        </FormControl>
        <FormControl id="enterLastName">
          <FormLabel>Last name
            <Input value={lastName} onChange={handleLastNameChange} />
          </FormLabel>
        </FormControl>
        <Button m={6} px={10} colorScheme="purple" onClick={handleClick}>Add Name</Button>
      </Box>
      </ChakraProvider>   
  )
}

export default App
