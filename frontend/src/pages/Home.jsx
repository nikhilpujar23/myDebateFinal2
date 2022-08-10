import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from 'react';

import Login from "../components/Login";
import SignUp from "../components/SignUp";




const Home = () => {
   

   
    return (
        <Container maxW='xl' centerContent>
            <Box
            display="flex"
         justifyContent='center'
        p='3'
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
            >
                <Text fontSize="4xl"  >myDebate</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
             <SignUp/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
        </Container>
    )
}
export default Home;