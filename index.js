import express from "express";
import router from "./routes/Auth.js";
import postRouter from "./routes/postRouter.js"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));


app.use("/api/auth",router)
app.use("/api/post",postRouter)


app.listen(8800,(req,res)=>{
    console.log("connected to Backend")
})