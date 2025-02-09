import mongoose from "mongoose";

const connectDB = async(DATABASE_URL) =>{
    try {
        const DB_OPTION = {
            dbName : 'vinay'
        }
        await mongoose.connect(DATABASE_URL, DB_OPTION);
        console.log("server is connected....")
    } catch (error) {
        console.log(error)
    }
}
export default connectDB;