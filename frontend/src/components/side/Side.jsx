import { Box, Button, Tooltip,Text, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Drawer, DrawerOverlay, DrawerContent, DrawerHeader,useDisclosure, DrawerBody, Input, Toast} from '@chakra-ui/react';
import {AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { DebateState } from '../../Context/DebateProvider';
import PfpModal from './PfpModal';
import axios from 'axios';
import UserListItem from './UserListItem';
function Side() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
     const [loading, setLoading] = useState(false);
     const [loadingDebatesForSelectedUser, setLoadingDebatesForSelectedUser] = useState("")
         const { isOpen, onOpen, onClose } = useDisclosure()

     const {user,setUser,debates,selectedDebate,setSelectedDebate,setDebates}=DebateState();
     const logoutHandler=()=>{
        setUser(null)
        localStorage.removeItem('data');
     }
     const handleSearch = async () => {
    if (!search) {
      Toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
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

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      Toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const callDebates=async(userId)=>{
        try {
      setLoadingDebatesForSelectedUser(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // const { data } = await axios.post(`http://localhost:5000/api/debate`,{ userId }, config);

      // if (!debates.find((c) => c._id === data._id)) setDebates([data, ...debates]);
      // setSelectedDebate(data);
      setLoadingDebatesForSelectedUser(false);
      onClose();
    } catch (error) {
      Toast({
        title: "Error fetching the debates",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  return (
    <>
    <Box
    display='flex'
    justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        
    >
        {console.log(isOpen)}
        <Tooltip label="Search users to add to your Debate" hasArrow placement='bottom-end' >
            <Button variant='ghost' onClick={onOpen} isLoading={loading}>
                <i className="fa fa-search" aria-hidden="true"></i>
                <Text display={{base:'none',md:'flex'}} ml='2'>Search Users</Text>
            </Button>
        </Tooltip>
        <Text fontSize='2xl' fontFamily='work sans'   >myDebate</Text>
        <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.dp}
              />
            </MenuButton>
            <MenuList>
              <PfpModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </PfpModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
    </Box>
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerHeader >Search Users</DrawerHeader>
            <DrawerBody>
                <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
              {!loading && searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => callDebates(user._id)}
                />))}
            </Box>
           
            </DrawerBody>
        </DrawerContent>

    </Drawer>
    </>
  )
}

export default Side