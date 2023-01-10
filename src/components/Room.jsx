import React from 'react'

const Room = ({room}) => {
  return (
    <div 
      // onClick={()=>handleSetRoom(room.id)}
      className='p-2 pt-4 pb-4 hover:bg-gray-800 cursor-pointer'>
      {room.name}
    </div>
  )
}

export default Room
