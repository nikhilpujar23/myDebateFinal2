import { Box } from '@chakra-ui/react';
import React, { useState } from 'react'
import DebateMessages from '../components/DebateMessages';
import DebatesList from '../components/DebatesList';

import Side from '../components/side/Side';

import { DebateState } from '../Context/DebateProvider'

function Debates() {
    const [fetchAgain, setFetchAgain] = useState(false);
    const{ user}=DebateState();
  return (
<div style={{ width: "100%" }}>

      {/* {user && <SideDrawer />} */}
       { <Side/>}
      <Box display="flex" justifyContent="space-between" width="100%" height="80.5vh" padding="10px" >
       
        { <DebatesList fetchAgain={fetchAgain}/>}
        { <DebateMessages fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Box>
    </div>
  )
}

export default Debates