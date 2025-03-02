import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {Loader, LoaderPinwheel} from 'lucide-react'
import { Toaster } from 'react-hot-toast'


import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthState } from './store/useAuthState.store'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const {authUser,checkAuthfront,isCheckingAuht,onlineUsers}=useAuthState()
  const {theme}=useThemeStore()

  console.log(onlineUsers)

  useEffect(()=>{
    checkAuthfront()
  },[checkAuthfront]);

  console.log({authUser})

  if(isCheckingAuht && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <LoaderPinwheel className='size-10 animate-spin'/>
    </div>
  )


  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<Home/>: <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={authUser?<Profile/>: <Navigate to='/login'/>}/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
