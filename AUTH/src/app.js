const express = require('express');
const app = express();
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter); /*is prefix ka ye matlab hai ,  authentication related jinti bhi API'S hongi , woh start hongi /api/auth se */



module.exports = app;