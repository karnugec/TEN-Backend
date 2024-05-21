
import { connect } from "mongoose";

const connection =async()=>{
    try {
       await connect(`${process.env.DB_URL}/TEN`)
       .then(()=>console.log("DB connected"))
       .catch((err)=>console.log(err))
    } catch (error) {
        console.log(error);
    }
}

export default connection;