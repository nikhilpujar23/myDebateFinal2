import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Toast,Text, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { DebateState } from '../Context/DebateProvider'
import CreateDebateModal from './CreateDebateModal';
import GroupChatModal from './CreateDebateModal';

function DebatesList({fetchAgain}) {
    const [currUser, setCurrUser] = useState('');
   const {user,debates,setDebates,selectedDebate,setSelectedDebate}=DebateState();
     const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/debate", config);
      if(!data){
        throw Error('Unable to fetch debates');
      }
    //   console.log(data);
    
      setDebates(data);
    } catch (error) {
      Toast({
        title: "Error Occured!",
        description: "Failed to Load the debates",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setCurrUser(JSON.parse(localStorage.getItem("userInfo")));
    if(!user)return;
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  return (
  <Box
      display={{ base: selectedDebate ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
         <Box
        pb={3}
        px={3}
        fontSize={{ base: "22px", md: "26px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
       < Text>Debates  you've joined</Text>
       <CreateDebateModal>

         <Button
            d="flex"
            fontSize={{ base: "10px", md: "10px", lg: "12px" }}
            rightIcon={<AddIcon />}
          >
            New Debate
          </Button>
       </CreateDebateModal>
      </Box>
      <Box
       display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
       { debates?
       <Stack overflowY='scroll'>
        {console.log(selectedDebate)}
       { debates.map((debate)=>(
            <Box
             onClick={() => setSelectedDebate(debate)}
                cursor="pointer"
                bg={selectedDebate === debate ? "#184a7e" : "#E8E8E8"}
                color={selectedDebate === debate ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={debate._id}
                >
                    <Text>

                   {debate.debateName}
                    </Text>
                </Box>
        ))}
         </Stack>
        
      

       :"Loading..."}
      </Box>
    </Box>
  )
}

export default DebatesList