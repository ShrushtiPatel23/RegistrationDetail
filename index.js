const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user.js');

const connectToMongo = require('./config/db.js');
const dotenv = require("dotenv").config()

connectToMongo()
const app = express()
const PORT = process.env.PORT || 8000;


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req,res) => res.send('Hello User'));
app.use('/users', userRoutes);


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));