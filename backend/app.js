const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors');

app.use(morgan('dev'));
require('dotenv').config();
require("./db/mongodb")
app.use(cors());

const api=require("./routes/blogRoute");
app.use("/api",api);

const userRouter = require("./routes/userRoute");
app.use("/api",userRouter);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});

