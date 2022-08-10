const express=require('express');
const { protect } = require('../middleware/authMiddleware');
const {fetchDebates, createDebate,removeDebate,addDebate} =require( '../controllers/debateControllers')
const router=express.Router();

// router.route("/").post(protect,accessDebates);
router.route("/").get(protect,fetchDebates);
router.route("/createdebate").post(protect,createDebate);
// router.route("/rename").put(protect,renameDebate);
router.route("/removedebate").put(protect,removeDebate);
router.route("/adddebate").put(protect,addDebate);

module.exports=router;