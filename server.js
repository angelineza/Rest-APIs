const express= require('express');
const app= express();
const port = 5000;
const dotenv= require('dotenv');
const mongoose= require('mongoose');
const swaggerUi= require('swagger-ui-express');
const swaggerJson= require('./swagger.json');

const url= "mongodb+srv://newuser:newpassword123@cluster0.taqksde.mongodb.net/?retryWrites=true&w=majority"

dotenv.config({path:'./.env'});
app.use(express.json())
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerJson));
app.use(require('./routes/userRoutes'))

mongoose.connect(url ,  {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log('Connected to db');
})
.catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use('',require('./routes/userRoutes'))


app.listen(port,(req,res)=>{
    console.log(`Server is running at port ${port} `);
})