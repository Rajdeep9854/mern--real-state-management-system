import React from 'react'
import {Link} from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold 
      my-7'>Sign up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username'
          className='border rounded-lg p-3' id='username' />
        <input type="email" placeholder='email'
          className='border rounded-lg p-3' id='email' />
        <input type="password" placeholder='password'
          className='border rounded-lg p-3' id='password' />
        <button  className='bg-slate-700 p-3 text-white 
        rounded-lg uppercase hover:opacity-85
        disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Have an account ? </p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp