import { SettingsIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { DebateState } from '../Context/DebateProvider';
import UserBadgeItem from './side/UserBadgeItem';
import UserListItem from './side/UserListItem';

function UpdateDebateModal({fetchMessages,fetchAgain,setFetchAgain}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
  const [debateName, setDebateName] = useState("")
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const toast = useToast();
const {user,selectedDebate,setSelectedDebate}= DebateState();
const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
    
       const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };
  const handleAddUser = async (user1) => {
    if (selectedDebate.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedDebate.groupAdmin !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/debate/adddebate`,
        {
          debateId: selectedDebate._id,
          userId: user1._id,
        },
        config
      );

      setSelectedDebate(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setDebateName("");
  };
  const handleRemove = async (user1) => {
  console.log(selectedDebate._id,user1._id);
    if (selectedDebate.groupAdmin !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      
      const { data } = await axios.put(
        `/api/debate/removedebate`,
        {
          debateId: selectedDebate._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedDebate("") : setSelectedDebate(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setDebateName("");
  };
  return (
   <>
    <IconButton display={{ base: "flex" }} icon={<SettingsIcon />} onClick={onOpen}  />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            {selectedDebate.debateName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" d="flex" flexWrap="wrap" pb={3}>
              {selectedDebate.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedDebate.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
          
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Debate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default UpdateDebateModal