import { async } from "@firebase/util";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../firebase/config";
import { addRoomMDActions } from "../../Redux/slice/addRoomMD";

const ModalInvite = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const open = useSelector((state) => state.room.openInvite);
  const inputRef = useRef(null);
  const {id} = useParams('id');
  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", name));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      toast.error(err);
    }
  };

  const handleSelect= (user) =>{
    setUsers(prev => [...prev,user])
    setName("");
    setUser(null);
    inputRef.current.focus();
  }
  const handleOnkey= (e) =>{
    e.code === "Enter" && handleSearch();
  }
  const handleSubmit= async() =>{
    
        await updateDoc(doc(db, "rooms", id), {
            members: arrayUnion([...users.map(user => user.uid)]),
          });
        console.log(user);
    
  }
  const handleRemoveUser= (id) =>{
    setUsers(prev => prev.filter((e) => e.uid!== id));
  }
  return (
    <div>
      <div
        // onClick={() => {dispatch(addRoomMDActions.change())}}
        className={`${
          open ? "block" : "hidden"
        } w-full h-screen flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-10 bg-black-rgba`}
      >
        <div className="w-96 rounded-md shadow-lg shadow-gray-300 p-4 bg-white">
          
            <div className="text-right">
              <i
                onClick={() => {
                  dispatch(addRoomMDActions.changeInvite());
                }}
                className="fa-solid fa-xmark p-2 text-lg text-red-500 cursor-pointer"
              ></i>
            </div>
            <h3 className="text-center font-bold text-xl">Invite</h3>
            <label htmlFor="name" className="block mt-4">
              Search
            </label>
            <input
              type="text"
              name="name"
              id=""
              ref={inputRef}
              className="p-2 pl-4 outline-none border border-gray-500 w-full rounded-md"
              onKeyDown={handleOnkey}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <div className={`${user ? "border-2 border-gray-300 mt-2" : ""}`}>
              {user && (
                <div
                  onClick={() =>handleSelect(user)}
                  className="w-full p-2 pt-4 pb-4 flex cursor-pointer hover:bg-gray-800 hover:text-white"
                >
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <h3>{user.displayName}</h3>
                </div>
              )}
            </div>
            <label htmlFor="name" className="block mt-4 ">
              List users
            </label>
            {users?.map((user, index) =>(
                <div key={index} className="p-2 pr-4 pl-4 flex bg-gray-500 rounded-3xl mw justify-between items-center">
                   <div className="flex">
                   <img className="w-5 h-5 rounded-full mr-2" src={user.photoURL} alt="" />
                    <p>{user.displayName}</p>
                   </div>
                   <i onClick={() =>handleRemoveUser(user.uid)}  className="fa-sharp fa-solid fa-xmark text-lg"></i>
                </div>
            ))}

            <button
              onClick={handleSubmit}
              className=" mt-6 block text-center bg-gray-900 text-white w-full p-2 rounded-md"
            >
              Add
            </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInvite;
