import { Button,Modal,useDisclosure,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton, ModalBody, ModalFooter, useToast, FormControl, Box,Input } from '@chakra-ui/react'
import axios from 'axios';

import React, { useState } from 'react'
import { DebateState } from '../Context/DebateProvider';
import UserBadgeItem from './side/UserBadgeItem';
import UserListItem from './side/UserListItem';

function CreateDebateModal({children}) {
     const { isOpen, onOpen, onClose } = useDisclosure()
     const [debateName, setDebateName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {user,debates,setDebates}=DebateState();
  const handleSearch = async (query) => {
    console.log(query);
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
      
      setLoading(false);
      setSearchResult(data);
      console.log(searchResult);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
      const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleSubmit = async () => {
    if (!debateName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/debate/createdebate`,
        {
          name: debateName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setDebates([data, ...debates]);
      onClose();
      toast({
        title: "New Debate Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create",
        description: error.response.data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >Create Debate
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
           <FormControl>
             <Input
                placeholder="Debate Name"
                mb={3}
                onChange={(e) =>{ setDebateName(e.target.value)}}
              />
           </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users to your debate"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
             <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>
             {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              searchResult.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

         <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Debate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateDebateModal