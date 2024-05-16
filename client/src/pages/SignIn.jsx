import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      console.log(formData);
    const res = await fetch("api/v1/auth/signin", {
      method: 'post',
      headers: {
        'Content-type' : 'Application/json'
      },
      body: JSON.stringify(formData)
    })

      const data = await res.json();
      console.log(data);


    if ( data.success=== false) {
      setError(data.message)
      setLoading(false);
      return;
    }    
      setLoading(false);
      setError(null)
      navigate('/')
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
        disabled:opacity-80'>{ loading ? 'Loading...' : 'Sign in'}</button>
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

export default SignUp