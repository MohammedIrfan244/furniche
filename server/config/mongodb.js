import mongoose from "mongoose";

const connectDb = async () => {
    // function to show the log for connecting
    mongoose.connection.on('connected',()=>console.log('Connected to database'))   
    try{
        // connecting
        await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`)
    }catch(err){
        console.log(err)
    }
}


export default connectDb
