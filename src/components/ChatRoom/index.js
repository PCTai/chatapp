import React from 'react'
import { Route , Routes } from 'react-router-dom';
import ChatBody from '../ChatBody';
import Navbar from '../Navbar';

const ChatRoom = () => {

  return (<>
  <div className='flex h-screen relative'>
      <Navbar/>
      <Routes>
        <Route path='/:id' element={<ChatBody/>}/>
        <Route path='/' element={<h3 className="p-4 max-h-16 m-6 flex-1 flex items-center bg-gray-bg text-white rounded-md">
          Please choose friend or room !
        </h3>}/>
      </Routes>
    </div>
  </>
    
  )
}

export default ChatRoom
