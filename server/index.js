require('./config/mongoose');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const adminRouter = require('./routes/adminRoute');
const app = express();

const allowedOrigins = ['http://localhost:5173']; 
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,"public","uploads")));

app.use('/',userRouter);
app.use('/admin',adminRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('--server--running--');
})