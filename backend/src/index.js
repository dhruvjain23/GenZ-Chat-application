import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors'

import path from 'path'

import {app,httpServer} from './lib/socket.js'

import messageRoutes from './routes/message.route.js'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';

dotenv.config();

const PORT=process.env.PORT;
const __dirname=path.resolve();

app.use(express.json({ limit: '10mb' }))     //this is used for parse the incoming request into json fromat from the request by post http method
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));


app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })                              
}



httpServer.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})