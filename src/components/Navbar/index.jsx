import { signOut } from 'firebase/auth';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../customhook/useAuth';
import { auth } from '../../firebase/config';
import ListRoom from '../ListGroup';
import ListUser from '../ListUser';
import SearchUser from '../SearchUser';

const Navbar = () => {
  const {currentUser} =useAuth();
  const {displayName, photoURL} =currentUser;
  const navigate = useNavigate();
  const handleLogout = () =>{
    signOut(auth).then(() =>{
      toast.success("Loggout out");
      navigate('/login')
    }).catch((error) =>{
      toast.error(error.message);
      
    })
  }
  return (
    <div className='w-80 h-full border-r-2 border-gray-200 p-6 bg-gray-900 text-white overflow-y-auto'>
      <div className="flex pb-4 justify-between items-center border-b-2 border-gray-200">
        <div className="flex items-center">
          <div className="border-4 border-white rounded-full">
          <img className=' w-10 h-10 rounded-full' src={photoURL} alt="" />
          </div>
          <h3 className='ml-2'>{displayName}</h3>

        </div>
        <button className='p-2 hover:opacity-60 border-2 border-red-500 rounded-sm' onClick={handleLogout}>Logout</button>
      </div>
      <SearchUser/>
      <h3 className="mt-4 mb-4">List Friend</h3>
      <ListUser/>
      <ListRoom />
    </div>
  )
}

export default Navbar
