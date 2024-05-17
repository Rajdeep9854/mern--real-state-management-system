import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess,signInFailure,signInStart } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading , error} = useSelector(state=>state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(signInStart());
      //console.log(formData);
    const res = await fetch("api/v1/auth/signin", {
      method: 'POST',
      headers: {
        'Content-type' : 'Application/json'
      },
      body: JSON.stringify(formData)
    })

      const data = await res.json();
      //console.log(data);


    if ( data.success=== false) {
      dispatch(signInFailure(data.message))
      return;
    }    
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
    

  }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id] : event.target.value
    })
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold 
      my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type="email" placeholder='email'
          className='border rounded-lg p-3' id='email' onChange={handleChange} />
        <input type="password" placeholder='password'
          className='border rounded-lg p-3' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 text-white 
        rounded-lg uppercase hover:opacity-85
        disabled:opacity-80'>{loading ? 'Loading...' : 'Sign in'}</button>
        <OAuth />
      </form>
      <div className='flex gap-3 mt-5'>
        <p>Do not have an account ? </p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-3'>{ error }</p>}
    </div>
  )
}

export default SignIn