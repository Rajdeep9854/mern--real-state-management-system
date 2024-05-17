import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider)
            console.log(result);


            const res = await fetch('/api/v1/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'Application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo : result.user.photoURL
                })
            })

            const data = await res.json();
            console.log(data);
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log('could not sign in with google',error);
        }
    }
  return (
      <button type='button' onClick={handleGoogleClick} className='bg-red-700 p-3 text-white
        rounded-lg uppercase hover:opacity-85'>continue with Google</button>
  )
}

export default OAuth