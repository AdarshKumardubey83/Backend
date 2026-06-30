import express from "express"
import authRouter from "./routes/auth.routes.js"
import handleError from "./middleware/error.middleware.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/auth", authRouter);

app.use(handleError); // app.js file mein jo sabse aakhri middleware hota hai woh hota hai error handling middleware 

export default app;