import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import useAuth from "../../customhook/useAuth";
import { Link, useParams } from "react-router-dom";
import AddRoom from "./AddRoom";

const ListRoom = () => {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { currentUser } = useAuth();

  const { "*": id } = useParams("id");

  useEffect(() => {
    const getChats = async () => {
      const q = query(collection(db, "rooms"));

      const querySnapshot = await getDocs(q);
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
  }, [currentUser.uid]);

  // const handleSetRoom = async (room) => {
  //   dispatch(chatActions.changeRoom(room));
  // };

  return (
    <div className="mt-4">
      <h3 className="">List Room</h3>
      <div className=" mb-4 max-h-48 overflow-y-auto">
        {rooms?.sort((a,b) =>  a['name'].toLowerCase() > b['name'].toLowerCase()? 1 : -1 )
        .map((room, index) => (
          <Link to={`${room.id}`} key={index}>
            <div
              className={`p-2 pt-4 pb-4 rounded-sm hover:bg-gray-800 cursor-pointer ${
                id === room.id ? "bg-gray-600" : ""
              }`}
              // onClick={() => handleSetRoom(room)}
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
            setOpen((prev) => !prev);
          }}
          className="border-2 p-2"
        >
          Add Room
        </button>
      </div>
      <AddRoom openModal={open} hideModal={setOpen} />
    </div>
  );
};

export default ListRoom;
