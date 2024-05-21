// const Admins = require("../models/Adminmodel.js");
// const Students = require("../models/Studentmodel.js");
// const Errorhandler = require("../utils/errorhandler.js");
// const catchAsyncErrors = require("../Middleware/catchasyncerrors.js");
// const bcrypt = require("bcrypt");

// //Admin Register
// exports.registerAdmin = catchAsyncErrors(
//     async (req, res, next) => {
//         const { fullname, email, mobilenumber, password } = req.body;

//         const AdminDoesExist = await Admins.findOne({email:email});
//         if(AdminDoesExist){
//             return next(new Errorhandler("Email Already Exists", 401));
//         }
//         const hashpassword = await bcrypt.hash(password,10);
//         const admin = await Admins.create({
//             fullname, email, mobilenumber, password:hashpassword
//         });
//         const adminData =  await admin.save();

//         res.status(200).json({
//             success: true,
//             message: "Admin Registered Successfully",
//             admin: adminData
//         });
//     }
// );
// //Student Register
// exports.registerStudent = catchAsyncErrors(
//     async (req, res, next) => {
//         const { fullname, email, password  } = req.body;

//         const StudentDoesExist = await Students.findOne({email:email});
//         if(StudentDoesExist){
//             return next(new Errorhandler("Email Already Exists", 401));
//         }
//         const hashpassword = await bcrypt.hash(password,10);

//         const new_student = await Students.create({
//             fullname, email, password:hashpassword
//         });
//         const data = await new_student.save();

//         const token = new_student.getJWTToken();
//         res.status(200).json({
//             success: true,
//             message: "Student Registered Successfully",
//             token,
//             student: data
//         });
//     }
// );

// //Admin Login 
// exports.loginAdmin = catchAsyncErrors(
//     async (req, res, next)=>{
//         const {email, password} = req.body;

//         // Checking if admin has given password and email both 
//         if(!email || !password){
//             return next(new Errorhandler("Please Enter Email and Password", 400))
//         }

//         const Adminuser = await Admins.findOne({email}).select("+password");

//         if(!Adminuser){
//             return next(new Errorhandler("Invalid Email or password", 401));
//         }

//         const isPasswordMatched = await bcrypt.compare(password,Adminuser.password);
//         if(!isPasswordMatched){
//             return next(new Errorhandler("Invalid Email or password", 401));
//         }
        
//         const token = Adminuser.getJWTToken();
//         res.status(200).json({
//             success: true,
//             message: "Admin Login Sucessfully",
//             token,
//         });
// });

// //Student Login
// exports.loginStudent = catchAsyncErrors(
//     async (req, res, next)=>{
//         const {email, password} = req.body;

//         // Checking if student has given password and email both 
//         if(!email || !password){
//             return next(new Errorhandler("Please Enter Email and Password", 400))
//         }

//         const Studentuser = await Students.findOne({email}).select("+password");

//         if(!Studentuser){
//             return next(new Errorhandler("Invalid Email or password", 401));
//         }

//         const isPasswordMatched = await bcrypt.compare(password,Studentuser.password);
//         if(!isPasswordMatched){
//             return next(new Errorhandler("Invalid Email or password", 401));
//         }

//         const token = Studentuser.getJWTToken();
//         res.status(200).json({
//             success: true,
//             message: "Student Login Successfully",
//             token,
//         });
// });


import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// export const registerUser = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { username, email, password, isAdmin } = req.body;

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       console.log("User with this email already exists");
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists" });
//     }

//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(password, salt);
//     const user = await User.create({
//       username,
//       email,
//       isAdmin,
//       password: hashedPassword,
//     });
//     console.log(user);
//     res
//       .status(201)
//       .json({ success: true, msg: "User created sucessfully", data: user });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error });

//   }
// };


export const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password ,isAdmin} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User with this email already exists");
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({
      username,
      email,
      isAdmin,
      password: hashedPassword,
    });
    console.log(user);
    res
      .status(201)
      .json({ success: true, msg: "User created successfully", data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: error });
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
       
    if (!user) {
      return res.status(404).json({ message: "USer Not found" });
    }
    const isMatched = bcrypt.compare(password, user.password);

   
    if (isMatched) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      console.log(token);

      const options = {
				expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            };

      res.cookie("userToken", token, options);
      res.status(201).json({ success: true, data: user, token });
    }
     else {
      return res
        .status(401)
        .json({ success: false, msg: "User Not authorized" });
    }
  } catch (error) {
    res.status(404).json({ success: false, msg: error.msg });
  }
};



export const getallusers = async (req, res) => {
  const user = await User.find({});
  res.status(201).json({ success: true, data: user });
};


export const getUserbyID = async(req,res)=>{
   try {
     const userDetails = await User.findById(req.params.id).populate('coursesEnrolled');
     if(!userDetails){
      return res.status(404).json({success:false,msg:"User not found"})
     }
     res.status(201).json({success:true,msg:"user found",data:userDetails})
   } catch (error) {
    return res.status(404).json({success:false})
   }
}

