const asyncHandler = require("express-async-handler");
const Debate = require("../models/debateModel");



const fetchDebates = asyncHandler(async (req, res) => {
  try {
       // .populate("groupAdmin")
    Debate.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      // .populate("latestMessage")
      .sort({ updatedAt: -1 })
     .then(async (results) => {
        // results = await Debate.populate(results, {
        //   // path: "latestMessage.sender",
        //   // select: "name pic email",
        // });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const createDebate=asyncHandler(async(req,res)=>{
 if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the feilds" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a debate");
  }

  users.push(req.user);
console.log(req.user)
  try {
    const debate = await Debate.create({
      debateName: req.body.name,
      users: users,
      isGroupDebate: true,
       groupAdmin: req.user,
    });
console.log(debate)
    const fullGroupDebate = await Debate.findOne({ _id: debate._id })
   

    res.status(200).json(fullGroupDebate);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
})

const removeDebate = asyncHandler(async (req, res) => {
  const {debateId, userId } = req.body;

  // check if the requester is admin

  const removed = await Debate.findByIdAndUpdate(
    debateId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
   

  if (!removed) {
    res.status(404);
    throw new Error("Could not remove user");
  } else {
    res.json(removed);
  }
});
const addDebate = asyncHandler(async (req, res) => {
  const { debateId,userId } = req.body;

  // check if the requester is admin

  const added = await Debate.findByIdAndUpdate(
    debateId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
   

  if (!added) {
    res.status(404);
    throw new Error("User not added");
  } else {
    res.json(added);
  }
});
module.exports={fetchDebates,createDebate,removeDebate,addDebate}