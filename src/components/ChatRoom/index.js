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
        
      </Routes>
      <AddRoom/>
      <ModalInvite/>
    </div>
  </>
    
  )
}

export default ChatRoom
