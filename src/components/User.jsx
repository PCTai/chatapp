import React from 'react'
import useAuth from '../customhook/useAuth';

const User = ({info, handleSelect}) => {
    const {currentUser} =useAuth();
  return (
    <div 
      onClick={() => handleSelect(info)}
      className='w-full p-2 pt-4 pb-4 flex cursor-pointer hover:bg-gray-800'>
      <img src={info?.photoURL} alt="" className='w-5 h-5 rounded-full mr-2' />
      <h3>{info?.displayName}</h3>
    </div>
  )
}

export default User
