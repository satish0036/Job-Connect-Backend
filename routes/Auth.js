import express from "express";
import { login } from "../controllers/Auth.js";
import { signup } from "../controllers/Auth.js";
import { logout } from "../controllers/Auth.js";

const router=express.Router()


// router.get("/signin",(req,res)=>{
//     res.json("from Auth")
// })
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)


export default router;