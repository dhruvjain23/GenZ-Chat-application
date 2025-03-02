import User from '../models/user.model.js'
import Message from "../models/message.model.js";
import cloudinary from '../lib/cloudianry.js';
import { getReceiverSocketId, io } from '../lib/socket.js';


// this function fetch all the users in the sidbar who are loggedin(having an account and loggedin is true) state in the app
export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select('-password')

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in message controller",error.message)
        res.status(500).json({error:"Internal Server error"})
    }
};

export const getMessages=async (req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log('Error in message Controller', error.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessage = async (req,res)=>{
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
    
        let imageUrl;
        if (image) {
          // Upload base64 image to cloudinary
          const uploadResponse = await cloudinary.uploader.upload(image);
          imageUrl = uploadResponse.secure_url;
        }
    
        const newMessage = new Message({
          senderId,
          receiverId,
          text,
          image: imageUrl,
        });
    
        await newMessage.save();

        const receiverSocketId =getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage',newMessage)
        }
    
        res.status(201).json(newMessage);
      } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
      }
}

export const deleteMessage = async(req,res)=>{
    try {
        const {id:messageId} =req.params

        if(!messageId) {
            return;
        }
        const deleteRespond= await Message.findByIdAndDelete(messageId);
        console.log(deleteRespond)

        res.status(200).json(deleteRespond)
        console.log(`Message with message id: ${messageId} is deleted successfully`)
    } catch (error) {
        console.log('Error in message delete controller',error)
        res.status(400).json(error)
    }

}