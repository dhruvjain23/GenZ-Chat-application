import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

const app=express();
const httpServer= http.createServer(app);

const io = new Server(httpServer,{
    cors:{
        origin:['http://localhost:5173']
    }
})

export function getReceiverSocketId(userId){
    return userSokcetMap[userId];
}

//to store online users
const userSokcetMap={} 

io.on("connection",(socket)=>{
    console.log("A User Connected",socket.id);

    const userId = socket.handshake.query.userId 
    if(userId) userSokcetMap[userId]=socket.id

    io.emit("onlineUserNotify",Object.keys(userSokcetMap))


    socket.on('disconnect',()=>{
        console.log("User Disconnected",socket.id)
        delete userSokcetMap[userId]
        io.emit("onlineUserNotify",Object.keys(userSokcetMap))
    })
})

export {io,app,httpServer};