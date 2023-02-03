import React, { useState } from 'react'
import { auth, db, storage } from '../../firebase/config';
import { createUserWithEmailAndPassword, FacebookAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {  doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const provider = new FacebookAuthProvider();
const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              // update user profile
              await updateProfile(user, {
                displayName: username,
                photoURL: downloadURL
              })

              // store user date in firestore database
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                displayName: username,
                email: email,
                photoURL: downloadURL,

              })

              await setDoc(doc(db, "userChats", user.uid), {});
            }
          )
        }
      )


      setLoading(false);
      toast.success("Account created")
      navigate('/login')
    } catch (error) {
      setLoading(false);
      toast.error("some thing went wrong")
    }
  }
  return (
    <div className='container m-auto h-screen flex justify-center items-center'>
      <div className=' rounded-2xl bg-slate-100 shadow-md shadow-slate-300'>
      {loading ? (<h3 className='text-center p-4 bg-gray-bg text-gray-200 rounded-sm'>Loading .....</h3>) :
          <form action="" className=' text-gray-300 max-w-3xl w-96 p-6 pl-10 pr-10 m-auto bg-gray-bg rounded-lg ' onSubmit={handleSubmit}>
            <h1 className='font-semibold text-center text-3xl mb-6 '>Register</h1>
            <div className="">
              <input
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text" name='name' placeholder='Name' 
                className='text-gray-200 bg-transparent  placeholder:text-gray-500 pt-4 pb-4 text-lg  border-b-2 border-gray-500 outline-none w-full' />
            </div>
            <div className="">
              <input
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email" name='email' placeholder='Email' 
                className='text-gray-200 bg-transparent  placeholder:text-gray-500 pt-4 pb-4 text-lg  border-b-2 border-gray-500 outline-none w-full' />
            </div>
            <div className="">
              <input
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" name='password' placeholder='Password ' autoComplete="on"
                className='text-gray-200 bg-transparent  placeholder:text-gray-500 w-full pt-4 pb-4 text-lg  border-b-2 border-gray-500 outline-none' />
            </div>
            <div className="mt-4">
              <label htmlFor="file" className='flex items-center text-gray-200'> <i class={` ${file ? "text-green-500" : ''} fa-regular fa-image text-2xl mr-2`}></i> <span className='text-sm'>Choose avatar</span></label>
              <input
                required 
                type="file"
                id='file'
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </div>
            <button type='submit' className='mt-6 p-2 w-full bg-green-500 text-white placeholder:text-gray-200 rounded-sm font-medium'>Sign up</button>
            <Link to={"/login"} ><h3 className='mt-2 text-center text-sm'>Already an account?</h3></Link>
          </form>
        }
        
      </div>
    </div>
  )
}

export default Login
