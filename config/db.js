const mongoose= require('mongoose');
const url= "mongodb+srv://newuser:newpassword123@cluster0.taqksde.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url)
.then(()=>{
    console.log('Connected to db');
})
.catch((err)=>{
    console.log(err);
});
