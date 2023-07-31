import dotenv from 'dotenv';
import express from "express";
import router from "./routes/Auth.js";
import postRouter from "./routes/postRouter.js"
import cors from "cors"
import cookieParser from "cookie-parser";
const PORT=process.env.PORT || 8800;
const app=express();
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   }));
dotenv.config();

app.use(cors({
  origin: ['http://localhost:3000', 'https://jobconnect1o.netlify.app','https://jobconnect2o.netlify.app/'],
  credentials: true,
}));

app.use(cookieParser())
app.use(express.json())


app.use("/api/auth",router)
app.use("/api/post",postRouter)


app.listen(PORT,(req,res)=>{
    console.log("connected to Backend")
})