import React, { useState } from 'react'
import { useAuthState } from '../store/useAuthState.store';
import { Antenna, BotMessageSquare, Eye, EyeOff, Loader2, Lock, Mail, MessageSquareCode, MessageSquareDashed, MessageSquareDiff, MessageSquareHeart, MessagesSquare, User, User2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImageContainer from '../components/ImageContainer';
import toast from 'react-hot-toast';

const Signup = () => {

  const [showPass,setShowPass]=useState(false);
  const [userData, setUserData]=useState({
    fullName:'',
    email:'',
    password:'',
  })

  const {signupFunction,isSigningUp}=useAuthState()

  const validateForm=()=>{
    if(!userData.fullName.trim()) return toast.error(`Name field can't be empty`);
    if(!userData.email.trim()) return toast.error(`email field can't be empty`);
    if (!/\S+@\S+\.\S+/.test(userData.email)) return toast.error("Invalid email format");
    if(!userData.password.trim()) return toast.error(`Password is required`);
    if(userData.password.length<8) return toast.error('Password must be atleast 8 character long');

    return true;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const validationSuccess= validateForm()

    if(validationSuccess===true){
      signupFunction(userData)
    }
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
        {/* lest side of form */}
        <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

          <div className='w-full max-w-md space-y-8'>
            {/*account creation logo  */}
            <div className='text-center mb-8'>
              <div className='flex flex-col items-center gap-2 group'>
                <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                <Antenna className='size-8 text-primary'/>

                </div>
                <h1 className="text-2xl font-bold mt-2 text-white drop-shadow-md">
              <span className="text-yellow-300 font-extrabold">Welcome</span> <span className="text-blue-400">back</span>
             </h1>
                <p className='text-base-content/80'>Get Started with your free account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Full Name</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='size-5 text-base-content/40'/>
                  </div>
                  <input
                      type="text"
                      placeholder="Full Name"
                      className="input input-bordered input-warning w-full pl-10 placeholder:text-yellow-300 text-yellow-300" 
                      value={userData.fullName}
                      onChange={(e)=>setUserData(({...userData,fullName:e.target.value}))}
                  />
                </div>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Email</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <User className='size-5 text-base-content/40'/>
                  </div>
                  <input
                      type="text"
                      placeholder="Email"
                      className="input input-bordered input-warning w-full pl-10 placeholder:text-yellow-300 text-yellow-300" 
                      value={userData.email}
                      onChange={(e)=>setUserData(({...userData,email:e.target.value}))}
                  />
                </div>
              </div>

              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-medium'>Password</span>
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='size-5 text-base-content/40'/>
                  </div>
                  <input
                      type={showPass?"text":"password"}
                      placeholder='••••••••'
                      className="input input-bordered input-warning w-full pl-10 placeholder:text-yellow-300 text-yellow-300" 
                      value={userData.password}
                      onChange={(e)=>setUserData(({...userData,password:e.target.value}))}
                  />
                  <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center' onClick={()=>{setShowPass(!showPass)}}>
                    {showPass?(<EyeOff className='size-6 text-base-content/40' />):<Eye className='size-5 text-base-content/40'/>}
                  </button>
                </div>
              </div>

              <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                {isSigningUp?(<><Loader2 className='size-5 animate-spin'/>Loading...</>):('Create Account')}
              </button>

            </form>

            <div className='text-center'>
              <p className='text-base-content/60'>Already have an account?{''}
                <Link to='/login' className='link link-primary'>
                 Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

      {/* right side image */}
      <ImageContainer
        title='Join our community'
        subtitle='Connect with friends, share moments, and stay in touch with your loved❤️ ones'
      />

    </div>
  )
}

export default Signup
