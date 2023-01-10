import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import{ addRoomMDActions } from '../../Redux/slice/addRoomMD'
import useAuth from '../../customhook/useAuth'

const AddRoom = () => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.room.open);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const {currentUser} = useAuth();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(name.trim() !== ""){
      const dateNow= Date.now();
      await setDoc(doc(db, "rooms", `${dateNow}`), {
        name,
        desc,
        members: [currentUser.uid],
        creatAt: serverTimestamp()
      });
      await setDoc(doc(db, "chats", dateNow), { messages: [] });
      dispatch(addRoomMDActions.change());
      toast.success("Add room success")
    }
  }
  return (
    <div
      // onClick={() => {dispatch(addRoomMDActions.change())}}
      className={`${
        open ? "block" : "hidden"
      } w-full h-screen flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-10 bg-black-rgba`}
    >
      <div className="w-96 rounded-md shadow-lg shadow-gray-300 p-4 bg-white">
        <form action="" onSubmit={handleSubmit}>
          <div className="text-right">
            <i
              onClick={() => {dispatch(addRoomMDActions.change())}}
              className="fa-solid fa-xmark p-2 text-lg text-red-500 cursor-pointer"
            ></i>
          </div>
          <h3 className="text-center font-bold">Add Room</h3>
          <label htmlFor="name" className="block mt-4">
            Name
          </label>
          <input
            type="text"
            name="name"
            id=""
            className="p-2 pl-4 outline-none border border-gray-500 w-full rounded-md"
            onChange={(e) =>{setName(e.target.value)}}
          />
          <label htmlFor="name" className="block mt-4 ">
            Description
          </label>
          <input
            type="text"
            name="name"
            id=""
            className="p-2 pl-4 outline-none border border-gray-500  w-full rounded-md"
            onChange={(e) =>{setDesc(e.target.value)}}

          />
          <button
            type="submit"
            className=" mt-6 block text-center bg-gray-900 text-white w-full p-2 rounded-md"

          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
