import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Router, Routes } from 'react-router-dom';
import { db } from '../../firebase/config';
import { getDatas } from '../../firebase/getData';
import { appActions } from '../../Redux/slice/appSlice';
import ChatBody from '../ChatBody';
import AddRoom from '../ListGroup/AddRoom';
import ModalInvite from '../ListGroup/ModalInvite';
import Navbar from '../Navbar';

const ChatRoom = () => {
  const dispatch = useDispatch();

  // useEffect(() =>{
  //   const q = query(collection(db, "users"));
  //   const data= [];
    
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //           data.push(doc.data());
  //       });
  //   });
    
  //   dispatch(appActions.setUsers(data));
  //   return () =>{
  //     unsubscribe();
  //   }
  // }, [])
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
