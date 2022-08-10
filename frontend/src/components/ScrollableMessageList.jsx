import { Avatar, Button, Text, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react'
import { DebateState } from '../Context/DebateProvider'

function ScrollableMessageList({messages}) {
    const {user}=DebateState();
   const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

 const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
const dummyMessageRef = useRef();
useEffect(() => {
dummyMessageRef.current?.scrollIntoView({behaviour:'smooth'})
console.log("AAAAAAA");
})


  return (
    <>
          
     {messages &&
        messages.map((m, i) => (

          <div style={{ display: "flex" }} key={m._id}>
            <span
            
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft:isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              
                borderRadius: "20px",
                padding: "7px 15px",
                maxWidth: "75%",
                alignItems:'center',
                display:"flex",

              }}
            >
               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={isSameSenderMargin(messages, m, i, user._id)}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
             <Text paddingLeft='3'>
              
              {m.content}
              </Text> 
            </span>
          </div>
        ))}
        <div ref={dummyMessageRef}>

        </div>
       
    </>
  )
}

export default ScrollableMessageList