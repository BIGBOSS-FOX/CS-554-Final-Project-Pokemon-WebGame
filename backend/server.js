const express = require ('express');
// const cors = require('cors');
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/Pokemon-Master',{useNewUrlParser:true , useCreateIndex:true}
// );
// const connection = mongoose.connection;
// connection.once('open',()=>{
//     console.log("MongoDB database connection established successfully")
// })

const monstersRouter = require('./routes/monsters');
const usersRouter = require('./routes/users');


app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use('/monsters',monstersRouter);
app.use('/users',usersRouter);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
});