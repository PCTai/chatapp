import { async } from "@firebase/util";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useUsers from "../../customhook/useUsers";
import { db } from "../../firebase/config";
import { addRoomMDActions } from "../../Redux/slice/addRoomMD";

const ModalInvite = () => {
  const [users, setUsers] = useState([]);
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const open = useSelector((state) => state.room.openInvite);
  const inputRef = useRef(null);
  const { "*": id } = useParams("id");
  const { users: listUser } = useUsers();

  const handleSearch = async () => {
    setResult(() => {
      return listUser.filter((uuser) =>
        uuser.displayName.toLowerCase().includes(name.toLowerCase())
      );
    });
  };

  const handleSelect = (user) => {
    setUsers((prev) => [...prev, user]);
    setName("");
    setResult([]);
    inputRef.current.focus();
  };
  const handleOnkey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSubmit = async () => {
    if (users?.length > 0) {
      const docRef = doc(db, "rooms", id);
      const docSnap = await getDoc(docRef);

      const { members: membersRoom } = docSnap.data();

      const roomRef = doc(db, "rooms", id);
      await updateDoc(roomRef, {
        members: [
          ...membersRoom,
          ...users
            .filter((user) => membersRoom.includes(user.uid) === false)
            .map((val) => val.uid),
        ],
      });
      setUsers(null);
    }
    // dispatch(addRoomMDActions.changeInvite());
  };
  const handleRemoveUser = (id) => {
    setUsers((prev) => prev.filter((e) => e.uid !== id));
  };
  return (
    <div>
      <div
        // onClick={() => {dispatch(addRoomMDActions.change())}}
        className={`${
          open ? "block" : "hidden"
        } w-full h-screen flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-10 bg-black-rgba`}
      >
        <div className="w-96 rounded-md  p-4 bg-white">
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
          <div
            className={` overflow-y-auto max-h-48
            ${
              result.length && result.length > 0
              ? "border-2 border-gray-300 mt-2"
              : ""
            }`}
          >
            {result.length > 0 &&
              result.map((user, index) => (
                <div
                  onClick={() => handleSelect(user)}
                  className="w-full p-2 pt-4 pb-4 flex cursor-pointer hover:bg-gray-800 hover:text-white"
                  key={index}
                >
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-5 h-5 rounded-full mr-2"
                  />
                  <h3>{user.displayName}</h3>
                </div>
              ))}
          </div>
          <label htmlFor="name" className="block mt-4 ">
            List users
          </label>
          <div className="flex">
            {users?.map((user, index) => (
              <div
                key={index}
                className="p-2 pr-4 pl-4 flex bg-gray-bg rounded-3xl mw justify-between items-center mr-2"
              >
                <div className="flex mr-2">
                  <img
                    className="w-5 h-5 rounded-full mr-2"
                    src={user.photoURL}
                    alt=""
                  />
                  <p className="text-gray-200">{user.displayName}</p>
                </div>
                <i
                  onClick={() => handleRemoveUser(user.uid)}
                  className="fa-sharp fa-solid fa-xmark text-lg"
                ></i>
              </div>
            ))}
          </div>

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
