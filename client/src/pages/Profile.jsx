import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getStorage, uploadBytesResumable,ref,getDownloadURL } from 'firebase/storage'
import { app } from '../firebase.js'
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess
} from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'


const Profile = () => {
  //console.log("in profile");
  const fileRef = useRef(null);
  const { currentUser ,loading , error} = useSelector(state => state.user)
  const [file, setFile] = useState(undefined)
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess , setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();
  
  
  //console.log(currentUser)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])
  
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
      (snapsort) => {
        const progress = (snapsort.bytesTransferred) / (snapsort.totalBytes) * 100;
        setFilePercentage(Math.round(progress))
      },
      (error) => {
      setFileUploadError(true)
      },
       () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    
);
    
    
    

  }

  const handleChange = (event) => {
    setFormData({...formData,[event.target.id]:event.target.value})
  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    
    try {
      dispatch(updateUserStart());
      //console.log(formData);
      const res = await fetch(`/api/v1/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData)
      })

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      //console.log(data);
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete = async () => {
    
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/v1/user/delete/${currentUser._id}`, {
        method: 'DELETE',

      })

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }


  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch('/api/v1/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data))
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={ handleSubmit} className='flex flex-col gap-4'>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(event)=>setFile(event.target.files[0])}
        />
        <img onClick={ ()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile"
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />

        <p className='text-sm self-center'>
          {
            fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )
          
        }</p>
        <input
          type="text"
          placeholder='username'
          id='username'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder='email'
          id='email'
          className='border p-3 rounded-lg'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder='password'
          id='password'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg uppercase p-3
          hover:opacity-90 disabled:opacity-80'>{loading ? 'Loading...' : 'update'}</button>
        
        <Link className='bg-green-700 text-white p-3 rounded-lg text-center
        uppercase hover:opacity-95' to={'/create-listing'}>create listing</Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete} className='text-red-700 cursor-pointer'>Delete account</span>
        <span onClick={ handleSignOut} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>

      <p className='text-red-700 mt-5'>{ error ? error :'' }</p>
      <p className='text-green-700 mt-5'>{ updateSuccess ? 'user is updated successfully' :'' }</p>
    </div>
  )
}

export default Profile