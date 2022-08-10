import { Box } from '@chakra-ui/react';
import React from 'react'
import { DebateState } from '../Context/DebateProvider';
import SingleDebate from './SingleDebate';

function DebateMessages({ fetchAgain, setFetchAgain }) {
  const { selectedDebate } = DebateState();
  return (
     <Box
      display={{ base: selectedDebate ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleDebate fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  )
}

export default DebateMessages