const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");
const app = express();
dotenv.config()
app.use(cors({
  origin:"http://localhost:3000",
}))
app.use(express.json());
//app.use(express.static('public'));
app.use(express.static('uploads'));

const usersRouter = require('./routes/users');
const fileRouter = require('./routes/uploads');
const productRouter = require('./routes/products');
const multiimg = require('./routes/multipleimage');
const checkout = require('./routes/checkout');
    
app.use('/users', usersRouter);
app.use('/api/',fileRouter);
app.use('/products/',productRouter);
app.use('/multi',multiimg);
app.use('/checkout',checkout);
mongoose
  .connect(
    'mongodb+srv://mongr:yw46DNwYWt4@cluster0.htcqlu9.mongodb.net/bakery?retryWrites=true&w=majority'
  )
  .then(result => {
    console.log("MongoDB database connection established successfully");
  })
  .catch(err => {
    console.log(err);
  });

 
  
/*
app.get("/api",(req,res)=>{
  res.json({"users":["userOne","userTwo","userThree"]});
})
*/
    
app.listen(5000,()=>{console.log("Server started on port 5000")})
