const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv/config');
const bodyParser = require('body-parser');


//import routes 
const postsRoute = require('./routes/posts');


//middle ware
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);


app.get('/', (req, resp) => {
    resp.send("home page");
})

//connect to database 
    mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true,useUnifiedTopology: true}, () =>{
    console.log('db connection success!');
});

//listen
app.listen(3000);
