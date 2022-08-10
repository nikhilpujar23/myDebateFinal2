const express=require('express');
const dotenv=require('dotenv');
const { chats } = require('./data/data');
const connectDb = require('./config/db');
const userRoutes =require('./routes/userRoutes');
const debateRoutes =require('./routes/debateRoutes');
const messageRoutes =require('./routes/messageRoutes');

const{onError,notFound}=require('../backend/middleware/onErrorMiddleware')


dotenv.config();
const app=express();

app.use(express.json());
connectDb()

//Deployment


app.use('/api/user',userRoutes)
app.use("/api/debate",debateRoutes)
app.use("/api/message",messageRoutes)
app.use(notFound);
app.use(onError);

const path=require('path')
const __dirname1=path.resolve()
if(process.env.NODE_ENV=='production'){
app.use(express.static(path.join(__dirname1,'/frontend/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
})
}
else{
app.get('/',(req,res)=>{
res.send("Api runnning")
})}



const PORT=process.env.PORT;
const server =app.listen(PORT,console.log(`${PORT}`))
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",

    // credentials: true,
  },
});

io.on("connection",(socket)=>{
    console.log("Connected to Socket.io ")
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join room", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
    });

    socket.on('new message',(newMessage)=>{
    var debate=newMessage.debate;
    console.log(debate);
    if(!debate.users){console.log("No users");}
    debate.users.forEach(user=>{
      if(user._id===newMessage.sender._id)return;
      socket.in(user._id).emit("message recieved",newMessage);
    })
    })
    socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
    });

});
