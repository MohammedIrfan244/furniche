import mongoose from "mongoose";

const connectDb = async () => {
    mongoose.connection.on('connected',()=>console.log('Connected to database'))   
    try{
        await mongoose.connect(process.env.MONGO_URI)
    }catch(err){
        console.log(err)
    }
}


export default connectDb
