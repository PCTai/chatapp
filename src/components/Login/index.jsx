import React, { useState } from 'react'
import { auth, db } from '../../firebase/config';
import { FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';

const provider = new FacebookAuthProvider();
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLoginFB = async (e) => {
    e.preventDefault();
    const { _tokenResponse, user } = await signInWithPopup(auth, provider);

    const { displayName, uid, photoURL, email } = user;
    if (_tokenResponse.isNewUser) {
      await setDoc(doc(db, "users", uid), {
        uid: uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL,

      })
    }
    toast.success("Successfully logged in");
    setLoading(false);
    navigate('/home');
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // console.log(userCredential.user);
    
    toast.success("Successfully logged in");
    setLoading(false);
    navigate('/home');
  }
  return (
    <div className='container m-auto h-screen flex justify-center items-center'>
      {
        loading ? (<h3 className='text-center'>Loading .....</h3>) :
          <form action="" className='text-gray-300 max-w-3xl w-96 p-6 pl-10 pr-10 m-auto bg-gray-bg rounded-lg ' onSubmit={handleLogin}>
            <h1 className='font-semibold text-center text-3xl mb-6 '>Login</h1>
           
            <div className="mt-4">
              
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" name='email' placeholder='Email' 
                className='text-gray-200 bg-transparent  placeholder:text-gray-500 pt-4 pb-4 text-lg  border-b-2 border-gray-500 outline-none w-full' />
            </div>
            <div className="mt-4">
              
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)} autoComplete="on"
                type="password" name='password' placeholder='Password ' 
                className='text-gray-200 bg-transparent  placeholder:text-gray-500 pt-4 pb-4 text-lg  border-b-2 border-gray-500 outline-none w-full' />
            </div>
            
            <button type='submit' className='mt-6 p-2 w-full text-white bg-green-500 rounded-sm font-medium'>Login</button>

            <Link to={"/register"}> <h3  className="mt-2 text-center text-sm">Don't have account?</h3></Link>
            <div className="mt-4">
                {/* <h3 className='text-center '>Login with</h3> */}
                <div className="flex items-center mt-2 justify-center">
                <div onClick={handleLoginFB} className='bg-blue-900 flex-1 text-center text-gray-200 p-2 text-sm  rounded-sm hover:opacity-80'><i className="fa-brands fa-facebook mr-2"></i>Facebook</div>
                <h3 className='ml-2 mr-2'>or</h3>
                <div className='bg-white flex-1 text-center text-gray-900 p-2 text-sm  rounded-sm hover:opacity-80'><i className="fa-brands fa-google mr-2"></i>Google</div>
                </div>
              </div>
          </form>
      }

    </div>
  )
}

export default Login
