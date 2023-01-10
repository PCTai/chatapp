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
          <form action="" className='w-96 p-6 m-auto bg-gray-900 rounded-lg text-white' onSubmit={handleLogin}>
            <h1 className='font-semibold text-center'>Login</h1>
            <div className="mt-4">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" name='email' placeholder='Enter your email' className='text-gray-900 p-1 pl-4 pr-4 mt-4 border-2 outline-none rounded w-full' />
            </div>
            <div className="mt-4">
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)} autoComplete="on"
                type="password" name='password' placeholder='Enter your password ' className='text-gray-900 w-full p-1 pl-4 pr-4 mt-4 border-2 outline-none rounded' />
            </div>
            <div className="p-6">
                <button onClick={handleLoginFB} className='bg-blue-900 block w-full mt-4 p-2 text-white rounded-3xl shadow-sm shadow-slate-300 hover:opacity-80'>Login with facebook</button>
                <button className='bg-white text-gray-900 block  w-full mt-4 p-2 mb-6  rounded-3xl shadow-sm shadow-slate-300 hover:opacity-80'>Login with google</button>
              </div>
            <button type='submit' className='mt-6 p-2 w-full bg-white text-gray-900 rounded-lg font-medium'>Login</button>

            <h3 className="mt-2 text-center text-sm">Don't have account? <Link to={"/register"}>Create an acount</Link></h3>
          </form>
      }

    </div>
  )
}

export default Login
