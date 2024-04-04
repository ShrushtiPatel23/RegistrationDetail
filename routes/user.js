const express = require('express');
const { createUser, loginUser, getUser, updateUser, deleteUser} = require("../controller/user.js");
const token  = require("../middleware/token.js");


const router = express.Router();

//create account
router.post('/', createUser);

//login user
router.post('/login', loginUser); 

//get data user
router.get('/get', token, getUser); 

//update user
router.put('/:id', token, updateUser); 

//delete user
router.delete('/:id', token, deleteUser); 

module.exports = router;