import { FormControl, FormLabel, Input, VStack, Button, InputGroup, InputRightElement,useToast} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
import { DebateState } from '../Context/DebateProvider';
export default function SignUp() {
    const {setUser}=DebateState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dp, setDp] = useState(undefined)
    const toast = useToast()

    const imageDetails=(dp)=>{
      setLoading(true);
      if(dp===undefined){
         toast({
          title: 'Error',
          description: "No picture selected",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      return;
      }
      // console.log(picture)
      if(dp.type==="image/jpeg"||dp.type==="image/png"){
        const data=new FormData();
        data.append("file",dp);
        data.append("upload_preset","mydebate");
        data.append("cloud_name","dwptsrced")
         fetch("https://api.cloudinary.com/v1_1/dwptsrced/image/upload", {
        method: "post",
        body: data,
      }).then((res)=>(res.json())).then(data=>{
          setDp(data.url.toString());
          // console.log(data)
          setLoading(false);
        }).catch(
          (err)=>{console.log(err);
          setLoading(false);}
        )
      }else{
          toast({
          title: 'Error',
          description: "Select a jpeg or png image",
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setLoading(false);
      }
    }
    const onSubmit=async()=>{

      setLoading(true);
      if (!name  || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          dp,
        },
        config
      );
      console.log(data);
      localStorage.setItem("data", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.log(error.message)
    }
      setLoading(false);
    
      }
  return (
    <VStack>
        <FormControl id='name' isRequired >
            <FormLabel>Username</FormLabel>
            <Input type='text' onChange={(e)=>{setName(e.target.value)}}/>
        </FormControl>
        <FormControl id='email' isRequired >
            <FormLabel>Email</FormLabel>
            <Input type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
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
        <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button size='sm' height='1.5rem' color='blue.500' mr='3'paddingX='1.5rem' onClick={()=>{
                setShow((prev)=>(!prev))}}>{show?"Hide":"Show"}</Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => imageDetails(e.target.files[0])}
        />
      </FormControl>
      <Button  colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={onSubmit}
        isLoading={loading}
        // isLoading={picLoading}
        >SignUp</Button>
    </VStack>
  )
}
