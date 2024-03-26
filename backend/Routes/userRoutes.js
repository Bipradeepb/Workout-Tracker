
import express from "express";
import {getAllData,postData,deleteData,updateData,getUnique} from "../Controllers/routerControllers.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router=express.Router();


//API is created

//use the authorisation checker middleware
router.use(requireAuth);

//get all
router.get("/",getAllData);

//create a new document
router.post("/",postData);

//get unique
router.get("/:id",getUnique);

//delete unique
router.delete("/:id",deleteData);

//update unique
router.patch("/:id",updateData);

export default router;
