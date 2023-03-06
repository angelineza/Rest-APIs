const {User}= require('../models/userSchema');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

//Creating a new user
const createUser= async(req,res)=>{
try {
    const {name,email,password}=req.body
    let findUser= await User.findOne({email:email})
    if (findUser) return res.status(400).send('The email is already taken');
    let user= new User();
    user.name=name
    user.email= email
    user.password= password
    await user.save()
    res.status(200).send(user) 
} catch (error) {
    console.log(err);
    res.status(500).send(err);
}
}

//Getting all users from the database

const getUsers= async(req,res)=>{
    try {
        const allUsers= User.find()
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({message:'Could not show all users'})
        console.log(err);
    }
}

// Getting a user by name

const getUserByName= async(req,res)=>{
    const theUser= User.find({name:req.params.name})
    .then((theUser)=>{
        res.status(200).json(theUser);
    })
    .catch((err)=>{
        res.status(500).json({message:'Could not get the user'})
        console.log(err);
    })
   
}

//Deleting a user by id

const deleteUser= async(req,res)=>{
   const token= req.header('myToken');
   if(!token) return res.status(404).send('Provide a token please')
   const user= jwt.verify(token,process.env.Secrete)
   const id= user.id
   await User.fin
  };

//Updating a user by id
 
const updateUser= async(req,res)=>{
    const token= req.header('myToken');
    if(!token) return res.status(404).send('Provide a token please')
    const user= jwt.verify(token,process.env.Secrete)
    try {
        const id = req.params.id;
        const { name, email ,password} = req.body;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = name;
      user.email = email;
      user.password = password;
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
};
//Log in function
const userLogin=async (req,res)=>{
   try {
    const {email,password}=req.body
    let findUser= await User.findOne({email:email})
    if(!findUser){
    return res.status(404).send('Invalid email or password')}
    let checkPassword= await bcrypt.compare(password,findUser.password)
    if(!checkPassword) return res.status(404).send('Invalid email or password')
    const token= findUser.giveToken();
    res.status(200).send(token)
   } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error')
   }
}

module.exports={
    createUser,
    getUsers,
    getUserByName,
    deleteUser,
    updateUser,
    userLogin
} 
