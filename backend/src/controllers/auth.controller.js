import cloudinary from '../lib/cloudianry.js';
import { generateToken } from '../lib/utils.js'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import multer from 'multer'
import fs from 'fs'

export const signup =async (req,res)=>{
    const {fullName,email,password}= req.body;
    try {

        if(!fullName|| fullName.trim()===''|| !email || email.trim()===''){
            return res.status(400).json({message:"All field is required"})
        }
        //hash password
        if(!password || password.length<8){
            return res.status(400).json({message:"Password must be atleast 8 characters"})
        }   

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "Email already exists"});

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPassword,
        })
        
        if(newUser){
            //generate jwt token here
            generateToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            });
        }
        else{
            res.status(400).json({message:"Invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup controller",error.message);
    }
}

export const login = async(req,res)=>{
    const {email, password}=req.body
    const user = await User.findOne({email});
    
    try{if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const isPassCorrect=await bcryptjs.compare(password,user.password)
    if(!isPassCorrect){
        return res.status(400).json({message:"Invalid credentials"});
    }
    generateToken(user._id,res)

    res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        email:email,
        profilePic:user.profilePic,
    })
    }
    catch(error){
        console.log("Errorin login controller",error.message)
        res.status(500).json({message:"Internal Server Error"})
    }

}

export const logout = async(req,res)=>{
    try {
        await res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller",error.message)
        res.status(500).json({message: "Internal Server Erro"})
    }
}

// export const updateProfile= async(req,res)=>{

//     try {
//         const {profilePic}=req.body;
//         const userId =req.user._id;

//         if(!profilePic){
//             return res.status(400).json({message:"Profile pic is requried"})
//         }
//         const uploadresponse= await cloudinary.uploader.upload(profilePic)
//         const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadresponse.secure_url},{new:true});
        
//         res.status(200).json(updatedUser)
//     } catch (error) {
//         console.log("Error in update profile controller",error.message)
//         res.status(500).json({message:"Internal server error"})
//     }
// }

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        // Upload the file to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(req.file.path);

        // Delete the temp file from server
        fs.unlinkSync(req.file.path);

        // Update user's profile picture URL in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = (req,res)=>{
    try {
        // console.log(req.user)
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth Controller",error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
}
