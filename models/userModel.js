import { Schema,model } from "mongoose";

const userSchema  = Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
    },
    isAdmin:{
    type:Boolean,
    default:false,
    },
    profilepicture:{
        type:String,
        default:"https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715472000&semt=ais_user"
    },
    coursesEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }]
},
{
    timestamps:true,
})

const User = model("User",userSchema)
export default User;