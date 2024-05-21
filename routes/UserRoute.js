// const express = require("express");
// const { registerAdmin,registerStudent, loginStudent, loginAdmin } = require("../controllers/UserControllers.js");
// const router = express.Router();

// //Admin Routes
// router.route("/Adminregister").post(registerAdmin);
// router.route("/Adminlogin").post(loginAdmin);

// //Student Routes
// router.route("/register").post(registerStudent);
// router.route("/login").post(loginStudent);

// module.exports = router;

import { Router } from "express";
import {registerUser,loginUser, getallusers, getUserbyID} from '../controllers/UserControllers.js'
// import { verifyToken } from "../Middleware/VerifyToken.js";

const Route = Router()


Route.route('/register').post(registerUser)
Route.route('/login').post(loginUser)
Route.route('/allusers').get(getallusers)
Route.route('/userbyId/:id').get(getUserbyID)


export default Route
