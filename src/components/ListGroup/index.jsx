import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Room from "../Room";
import { addRoomMDActions } from "../../Redux/slice/addRoomMD";
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useAuth from "../../customhook/useAuth";
import { chatActions } from "../../Redux/slice/chatUser";
import { Link } from "react-router-dom";

const ListRoom = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const getChats = async () => {
      const q = query(collection(db, "rooms"))
      const querySnapshot = await getDocs(q);
      setRooms([]);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const {members} = doc.data();
        if(members.includes(currentUser.uid)){
          setRooms((prev) =>[...prev, {...doc.data(),id: doc.id}]);
        }
      });
      
    };

    getChats();
    return () => {
      getChats();
    };
  }, [currentUser.uid, setRooms]);

  // console.log(rooms);
  const handleSetRoom= async(room) =>{
    dispatch(chatActions.changeRoom(room ))
    
  }

  return (
    <div className="mt-4">
      <h3 className="">List Room</h3>
      <div className="">
        {rooms.map((room, index) =>(
          <Link to={`${room.id}`}
          key={index} >
            <div 
            className='p-2 pt-4 pb-4 hover:bg-gray-800 cursor-pointer'
            onClick= {() => handleSetRoom(room)}
            
            room={room} >{room.name}</div>
          </Link>
        ))}
      </div>
      <div className="text-center border-t border-gray-200 pt-4">
        <button
          onClick={() => {
            dispatch(addRoomMDActions.change());
          }}
          className="border-2 p-2"
        >
          Add Room
        </button>
      </div>
    </div>
  );
};

export default ListRoom;
