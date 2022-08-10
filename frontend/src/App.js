
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
//  useEffect(() => {
     
  

//     // if (user) navigate("/debate");
//     setUser({_id: "62eb6a1fe60d125786710322",
//         name: "Nikhil  Pujar",
//         email: "nikhilrpujar@gmail.com",
//         password: "$2a$10$QzYz1ctMo51Yd4OpXBP74er5HuY/R6IThfMbUnhkjmwH2kMOju9r.",
//         dp: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        
//         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWI2YTFmZTYwZDEyNTc4NjcxMDMyMiIsImlhdCI6MTY2MDEwNTI0NSwiZXhwIjoxNjYwMTkxNjQ1fQ.1w2_1uz8ZKOEobAoX0y10FQ3XiRcN_a7ot_fqXVjBH8"
//         })
//   }, []);
  return (
   
     
    <ChakraProvider >
<div className="App">
{user && <Debates/>}

    {console.log(user)}
{!user && < Home/>}
{/* {false && < Home/>} */}


</div>
 </ChakraProvider>
      

   
  );
}

export default App;

//"heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"
