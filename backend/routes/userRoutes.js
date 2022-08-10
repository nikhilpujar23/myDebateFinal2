const express=require('express');

const { registerUser, auth,fetchUsers } = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router=express.Router();
router.post('/login',auth)

router.route('/').post(registerUser).get(protect,fetchUsers)
module.exports=router;
