const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Debate=require("../models/debateModel")
const allMessages=asyncHandler(async(req,res)=>{
    try {
    const messages = await Message.find({ debate: req.params.debateId })
      .populate("sender", "name dp email")
      .populate("debate");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content, debateId } = req.body;

  if (!content || !debateId) {
    console.log("Invalid data");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    debate: debateId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name dp");
    message = await message.populate("debate");
    message = await User.populate(message, {
      path: "debate.users",
      select: "name dp email",
    });

    

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };
