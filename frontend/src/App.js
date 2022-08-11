
import { ChakraProvider} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';
import { DebateState } from './Context/DebateProvider';
import Debates from './pages/Debates';
import Home from './pages/Home';


function App() {
const {user,setUser}=DebateState();
const navigate=useNavigate();
 useEffect(() => {
     
   const data = JSON.parse(localStorage.getItem('data'));
   console.log(data);
   if(data)
  setUser(data);
    
  
  },[user,setUser]);
  return (
   
     
    <ChakraProvider >
<div className="App">
{user && <Debates/>}

    {console.log(user)}
{!user && < Home/>}



</div>
 </ChakraProvider>
      

   
  );
}

export default App;

//"heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
