// import content 
const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const signin = require('./controller/Signin/Signin');
const storePass = require('./controller/PScreate/Store')
const updateScore = require('./controller/Score/score');
const { getScore } = require('./controller/Score/score');
const reset = require('./controller/Reset/Reset')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; 
//db client
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,

    }
});

//use the middleware
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req,res) => {res.send('its working')})
//signin
app.post('/signin', (req,res) => signin.handleSignin(req,res,db,bcrypt));
//update password
app.put('/store', (req,res) => storePass.storeBcrypt(req,res,db,bcrypt));

//get score
app.get('/updateScore', (req,res) => updateScore.getScore(req,res,db));
//update score
app.put('/updateScore', (req,res) => updateScore.updateScore(req,res,db,bcrypt));

//Reset Score
app.put('/reset', (req,res) => reset.resetScore(req,res,db));


//set up paths 

//set up server
const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`Server is Running on Port ${PORT}`)) 