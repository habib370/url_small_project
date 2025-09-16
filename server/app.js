import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from './routers/user.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express();
dotenv.config()
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
const PORT=process.env.PORT||7000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
  console.log("data base connected! 👍")
})

app.use('/',userRoutes)
app.listen(PORT,()=>{
  console.log(`server connected on port ${PORT}`)
})