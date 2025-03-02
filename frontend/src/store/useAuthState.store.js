import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import {io} from 'socket.io-client'
import toast from 'react-hot-toast'


const BASE_URL= import.meta.env.MODE ==='development'?'http://localhost:8000':"/";

export const useAuthState =create((set,get)=>({
    authUser:null,    //initially user is not authenticated and set its info to null
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    isCheckingAuht:true,
    onlineUsers:[],
    socket:null,

    checkAuthfront:async()=>{
    try {
        const res =await axiosInstance.get('/auth/check')

        set({authUser:res.data})

        get().connectSocket()
    } catch (error) {
        console.log("error in checkAuht front",error)
        set({authUser:null})
    }
    finally{
        set({isCheckingAuht:false})

    }
    },

    signupFunction:async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data});
            toast.success("Account Created Successfully")

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in registering the user{f}",error)
        }
        finally{
            set({isSigningUp:false})
        }
    },

    loginFunction:async(data)=>{
        set({isLoggingIng:true})
        try {
            const res = await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("Logged in successfully")

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in registering the user{f}",error)
        } finally{
            set({isLoggingIng:false})
        }

    },

    logout_front:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success('Logged out sucessfully');

            get().disConnectsocket();
        } catch (error) {
            toast.error(error.response.data.message);
            // console.log('Error in logout{f}',error.message)
        }
    },

    updateProfile: async (file) => {
        set({ isUpdatingProfile: true });
        try {
            const formData = new FormData();
            formData.append("profilePic", file);
    
            const res = await axiosInstance.put("/auth/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            set({ authUser: res.data });
            toast.success("Profile Pic Uploaded");
        } catch (error) {
            console.log("Error in uploading the image", error);
            toast.error(error.response?.data?.message || "Upload failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: ()=>{
        const {authUser}=get()

        if(!authUser || get().socket?.connected) return

        const socket=io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        });
        socket.connect();
        set({socket:socket});

        socket.on('onlineUserNotify',(userIds)=>{
            set({onlineUsers:userIds})
        })

    },

    disConnectsocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
    
}))