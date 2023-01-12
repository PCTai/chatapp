import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addRoomMDActions } from "../../Redux/slice/addRoomMD";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import useAuth from "../../customhook/useAuth";
import { chatActions } from "../../Redux/slice/chatUser";
import { Link, useParams } from "react-router-dom";

const ListRoom = () => {
  const dispatch = useDispatch();
  const [rooms, setRooms] = useState([]);
  const { currentUser } = useAuth();

  const { "*": id } = useParams("id");
  // useEffect(() =>{
  //   const q = query(collection(db, "rooms"));
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       const data = [];
  //       snapshot.forEach((doc) => {
  //         const { members } = doc.data();

  //         if (members && members.includes(currentUser.uid)) {
  //           data.push({ ...doc.data(), id: doc.id });
  //         }
  //       });
  //       console.log(data);
  //     });
  //     unsubscribe();
  // },[])
  useEffect(() => {
    const getChats = async () => {
      const q = query(collection(db, "rooms"));
      // const unsubscribe = onSnapshot(q, (snapshot) => {
      //   const data = [];
      //   snapshot.forEach((doc) => {
      //     const { members } = doc.data();

      //     if (members && members.includes(currentUser.uid)) {
      //       data.push({ ...doc.data(), id: doc.id });
      //     }
      //   });
      //   console.log(data);
      // });
      // unsubscribe();
      const querySnapshot = await getDocs(q);
      // setRooms([]);
      const data = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const { members } = doc.data();

        if (members && members.includes(currentUser.uid)) {
          data.push({ ...doc.data(), id: doc.id });
        }
      });
      setRooms(data);
    };

    getChats();
    return () => {
      getChats();
    };
  }, [currentUser.uid, setRooms]);

  // console.log(rooms);
  const handleSetRoom = async (room) => {
    dispatch(chatActions.changeRoom(room));
  };

  return (
    <div className="mt-4">
      <h3 className="">List Room</h3>
      <div className=" mb-4 max-h-48 overflow-y-auto">
        {rooms.map((room, index) => (
          <Link to={`${room.id}`} key={index}>
            <div
              className={`p-2 pt-4 pb-4 hover:bg-gray-800 cursor-pointer ${
                id === room.id ? "bg-gray-600" : ""
              }`}
              onClick={() => handleSetRoom(room)}
              room={room}
            >
              {room.name}
            </div>
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
