
import {Schema,model} from "mongoose";
const CourseSchema = new Schema({
    title:{
        type:String,
        required:[true,'Please Enter Course Name'],
        unique:true
    },
    description:{
        type:String,
        required:[true,'Please Enter Course Description'],
    },
    price:{
        type:Number,
        required:[true,"Please Enter Course Price"],
        maxLength:[8,"Price cannot exceed 8 characters"]
    },
    imgSrc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        // required:[true,"Please Enter Course Category"]
    }
});


export const Course = model("Course",CourseSchema);
