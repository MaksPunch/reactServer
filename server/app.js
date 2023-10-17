const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const {MemoryStore} = require('express-session/session/memory')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
const morgan = require('morgan');

app.use(morgan('tiny'))
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4173"],
  credentials: true,
  sameSite: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const logger = require('./utils/winston.js')

logger.log({
  level: 'info',
  message: 'Hello distributed log files!'
});

const session = require('express-session')

const auth = require('./routes/auth');
const refreshTokenRoutes = require("./routes/refreshToken.js");

app.use(session({
  name: "123",
  secret : process.env["SECRET_KEY"],
  resave : false,
  saveUninitialized: true,
  rolling: true,
  cookie : {
    name: '123',
    maxAge: (1000 * 60 * 60 * 24 * 30),
    expires: (1000 * 60 * 60 * 24 * 30),
    httpOnly: true,
  },
}));

app.use(express.json());
app.use('/api', auth);
app.use('/api/refreshToken', refreshTokenRoutes)

let server = app.listen(3000, () => {
	console.log("server listen to port 3000")
})

module.exports = server;