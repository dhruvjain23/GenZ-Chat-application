import mongoose from 'mongoose';

export const connectDB = async()=>{
    try {
       const conn= await mongoose.connect(process.env.MONGODB_URI);
       console.log(`MongoDB connected: ${conn.connection.host}`);
       
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
    }
};


//this is the procedure for connect the database , first fetch the mongo uri from the mongo db then put it into the .env file and then create the connection with the database.