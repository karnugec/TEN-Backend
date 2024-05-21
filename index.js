// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// dotenv.config();
// app.use(express.json());
// const cors = require('cors');

// const contactRoute = require('./routes/contact.js');
// const userRoute = require('./routes/UserRoute.js');
// const errorMiddleware = require("./Middleware/error.js");

// app.use(errorMiddleware);

// const PORT = process.env.PORT || 4000;
// //Connecting to DB
// const connectDatabase = require("./config/database.js");
// connectDatabase();

// // app.use(
// //     cors({
// //         origin: "https://ten-bl2h.vercel.app",
// //         credentials: true,
// //     })
// // );
// app.use(cors());

// app.use("/api/v1", contactRoute);
// app.use("/api/v2", userRoute);

// app.get('/', (req, res) => {
//     return res.json({
//         success: true,
//         message: "Your server is up and running..."
//     });
// });

// app.listen(PORT, () => {
//     console.log(`App is running at port ${PORT}`);
// });

import express from "express";
import dotenv from 'dotenv'
import connection from "./config/database.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
const app = express()
app.use(express.json())
app.use(cookieParser());

// app.use(cors({
//     // origin: "http://localhost:5173", 
//     origin: "https://ten-bl2h.vercel.app",
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   }));
app.use(cors());
dotenv.config()

import Route from "./routes/UserRoute.js";
import courseRoute from "./routes/courseRoutes.js";


app.use('/api/users', Route)
app.use('/api/users',courseRoute)


if(connection()){
app.listen(process.env.PORT ,()=>{
    console.log(`App started at ${process.env.PORT} `);
})}