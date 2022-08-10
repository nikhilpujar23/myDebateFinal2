import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { DebateState } from '../Context/DebateProvider'
import ScrollableMessageList from './ScrollableMessageList';
import UpdateDebateModal from './UpdateDebateModal';
import io from 'socket.io-client'

const ENDPOINT="https://mydebate-nikhil.herokuapp.com/";
var socket;
function SingleDebate({fetchAgain,setFetchAgain}) {
    const {user,selectedDebate,setSelectedDebate}= DebateState();
    const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDebateCompare, setSelectedDebateCompare] = useState('')
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();
 useEffect(() => {
 socket=io(ENDPOINT);
 if(!user)return;
 socket.emit("setup",user);
 socket.on("connection",()=> setSocketConnected(true));

}, [ENDPOINT]);

const fetchMessages = async () => {
    if (!selectedDebate) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
// console.log(selectedDebate._id);
      const { data } = await axios.get(
        `/api/message/${selectedDebate._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join room", selectedDebate._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const typingHandler=(e)=>{
    setNewMessage(e.target.value);
  }
  const sendMessage=async(e)=>{
    if(e.key=="Enter" && newMessage){
      try {
        const config={
          headers:{
            "Content-type":"application/json",
        Authorization: `Bearer ${user.token}`,
          }
        }
        const {data}=await axios.post('/api/message',{
          content:newMessage,
          debateId:selectedDebate._id,

          },config);
          if(!data){
            throw new Error('Failed to send message');
          }
          socket.emit('new message',data)
          setNewMessage("");
          setMessages([...messages,data]);
      } catch (error) {
        toast({
          title:"Error",
          description:error.message,
          status:"error",
          isClosable:true,
          duration:5000,
        })
      }
    }
  }
 

    useEffect(() => {
    fetchMessages();
  setSelectedDebateCompare(selectedDebate);
  
  
  }, [user,selectedDebate]);
  useEffect(() => {
    socket.on("message recieved",(newMessage)=>{
      console.log("message recieved",selectedDebateCompare, newMessage.debate._id);
      if(!selectedDebateCompare || selectedDebateCompare._id!==newMessage.debate._id)return;
      setMessages([...messages,newMessage]);
    })
  })
  
  return (
   <>
   {selectedDebate?
   <>
         <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            flexDir='row'
            justifyContent="space-between" 
            alignItems="center"
           
            
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedDebate("")}
              ml='3'
            />
           

            {selectedDebate.debateName}
            <UpdateDebateModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
            </Text>
            <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <Box display='flex' flexDir='column' overflowY='scroll' height='40vh'>
               
                <ScrollableMessageList messages={messages} />
             
              </Box>
            )}
             <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
              onChange={typingHandler}
            >
              {/* {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )} */}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
   </>
   :
  <>
  <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a debate to view messages
          </Text>
        </Box>
   </>
   }
   </>
  )
}

export default SingleDebate