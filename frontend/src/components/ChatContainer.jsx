import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useAuthState } from '../store/useAuthState.store'
import { formatMessageTime } from '../lib/utils'
import { Delete, Trash2 } from 'lucide-react'

const ChatContainer = () => {
    const {messages,getMessages,isMessagesLoading,selectedUser,listenNewMessages,notListenNewMessages,deleteMessage}=useChatStore()

    const {authUser}=useAuthState()

    const messageEndRef= useRef(null)

    useEffect(()=>{
        getMessages(selectedUser._id);

        listenNewMessages()

        return ()=> notListenNewMessages();
    },[selectedUser._id,getMessages],listenNewMessages,notListenNewMessages);


    useEffect(()=>{
        if(messageEndRef.current && messages)
            {messageEndRef.current.scrollIntoView({behaviour:'smooth'})}
    },[messages])

    if(isMessagesLoading) return (
        <div className='flex-1 felx flex-col overflow-auto'>
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/>
        </div>
    )


  return (
    <div className=' flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <div className=' flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message)=>(
                <div key={message._id} className={`chat ${message.senderId===authUser._id ? 'chat-end':" chat-start"}`} ref={messageEndRef}>
                    
                    <div className='chat-image avatar'>
                        <div className=' size-10 rounded-full border'>
                            <img src={message.senderId ===authUser._id ?authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile-pic" />

                        </div>       
                    </div>
                    
                    <div className=' chat-header mb-1'>
                        <time className=' text-xs  opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
                        
                    </div>
                    
                    <div className={`flex items-center gap-2 ${message.senderId === authUser._id ? 'flex-row-reverse': 'flex-row'}`}>
                        <div className=' chat-bubble flex flex-row'>
                            {message.image && (
                                <img src={message.image} alt="Image" className='sm:max-w-[200px] rounded-md mb-2' />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                        <div className=' cursor-pointer' onClick={()=>{deleteMessage(message._id)}}>
                            <Trash2 className='h-5' />
                        </div>
                    </div>
                </div>
                
            ))}
        </div>
        <MessageInput/>
      
    </div>
  )
}

export default ChatContainer
