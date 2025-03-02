import {create} from 'zustand'
import toast from 'react-hot-toast'
import {axiosInstance} from '../lib/axios.js'
import { useAuthState } from './useAuthState.store.js'

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    
    
    getUsers: async()=>{
        set({isUserLoading:true})
        try {
            const res= await axiosInstance.get('/message/users')
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isUserLoading:false})
        }
    },
    

    getMessages :async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res= await axiosInstance.get(`/message/${userId}`)
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isMessagesLoading:false})
        }
    },

    sendMessage:async(messageData)=>{
        const {selectedUser,messages}=get()
       
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
          } catch (error) {
            toast.error(error.response.data.message);
          }
    },

    setSelectedUser :async(selectedUser)=>{
        set({selectedUser})
    },

    listenNewMessages:()=>{
        const {selectedUser}=get()
        if(!selectedUser) return

        const socket =useAuthState.getState().socket;


        socket.on('newMessage',(newMessage)=>{
            if(newMessage.senderId!==selectedUser._id) return ;
            set({messages: [...get().messages,newMessage]})
        })
    },

    notListenNewMessages:()=>{
        const socket =useAuthState.getState().socket;
        socket.off('newMessage')
    },

    deleteMessage:async (messageId)=>{
        const {messages} =get()
       try {
        const res= await axiosInstance.delete(`/message/delete/${messageId}`)
        toast.success('Message deleted successfully')
        set({ messages: messages.filter((msg) => msg._id !== messageId) });
       } catch (error) {
        toast.error(error.response.data.message);
        console.log('Error in deleting the message{f}',error)
       }
    }
}))