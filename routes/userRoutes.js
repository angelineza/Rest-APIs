const express=require('express');
const {createUser, getUsers, getUserByName, deleteUser, updateUser, userLogin} = require('../controllers/userController');
const router= express.Router();

router.post('/user',createUser);
router.get('/users',getUsers);
router.get('/user/:name',getUserByName);
router.delete('user/delete/:id',deleteUser);
router.put('/user/update/:id',updateUser);
router.post('/user/login',userLogin);

module.exports=router;