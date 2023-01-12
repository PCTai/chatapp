import React, { useState } from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import ChatBody from '../ChatBody';
import AddRoom from '../ListGroup/AddRoom';
import ModalInvite from '../ListGroup/ModalInvite';
import Navbar from '../Navbar';

const ChatRoom = () => {
  
  return (<>
  <div className='flex h-screen relative'>
      <Navbar/>
      <Routes>
        <Route path='/:id' element={<ChatBody/>}/>
        <Route path='/' element={<h3 className="p-4 max-h-16 m-6 flex-1 flex items-center bg-gray-bg text-white rounded-md">
          Please chooes friend or group !
        </h3>}/>
        
      </Routes>
      <AddRoom/>
      <ModalInvite/>
    </div>
  </>
    
  )
}

export default ChatRoom
