import { FormControl, FormLabel, Input, VStack, Button, InputGroup, InputRightElement,useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';


import axios from 'axios'
import { DebateState } from '../Context/DebateProvider';
export default function SignUp() {
  const toast=useToast();
 const {setUser}=DebateState()
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
     const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('');
   const onSubmit=async()=>{

      setLoading(true);
      if (!email || !password ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
   
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
         
          email,
          password,
          
        },
        config
      );
     localStorage.setItem("data", JSON.stringify(data));
     setUser(data);
    } catch (error) {
      console.log(error.message)
    }
      setLoading(false);
     
      }
  return (
    <VStack>
        <FormControl id='email' isRequired>
            <FormLabel>Useremail</FormLabel>
            <Input type='text' onChange={(e)=>{setEmail(e.target.value)}}/>
        </FormControl>
        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>

            <Input type={show?'text':'password'}  onChange={(e)=>{setPassword(e.target.value)}}/>
            <InputRightElement>
             <Button size='sm' height='1.5rem' color='blue.500' mr='3'paddingX='1.5rem' onClick={()=>{
                setShow((prev)=>(!prev))}}>{show?"Hide":"Show"}</Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
         <Button  colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={onSubmit}
        isLoading={loading}
        >Login</Button>
     
     
    </VStack>
  )
}
