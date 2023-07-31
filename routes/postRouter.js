import express from "express";
import { addUserInfo } from "../controllers/postControllers.js";
import { addJob } from "../controllers/postControllers.js";
import { getJobs } from "../controllers/postControllers.js";
import {getUserInfo} from "../controllers/postControllers.js"
import {deleteJob} from "../controllers/postControllers.js"
import {editJob} from "../controllers/postControllers.js"
const postRouter=express.Router()

postRouter.post("/userInfo",addUserInfo)
postRouter.post("/addJob",addJob)
postRouter.get("/getJobs",getJobs)
postRouter.get("/getUserInfo/:uid",getUserInfo)
postRouter.delete("/deleteJob/:id",deleteJob)
postRouter.put("/editJob/:id",editJob)


export default postRouter;