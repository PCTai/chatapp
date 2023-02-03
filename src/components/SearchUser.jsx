import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import useAuth from "../customhook/useAuth";
import useUsers from "../customhook/useUsers";
import { db } from "../firebase/config";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [listUser, setListUser] = useState([]);
  const { currentUser } = useAuth();
  const { users } = useUsers();
  // console.log(users);

  const handleSearch = async () => {
    setListUser(() => {
      return users.filter(
        (uuser) => uuser.displayName.toLowerCase().includes(username.toLowerCase())
      );
    });
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async (user) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists() && currentUser.uid !== user.uid) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        // console.log("up date");
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setListUser([]);
    setUsername("");
  };
  return (
    <div className="mt-4">
      <h3 className="mb-2">Search</h3>
      <input
        placeholder="Find a user"
        onKeyDown={handleKey}
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        className="p-2 pl-4 text-black w-full outline-none rounded-sm"
        // onBlur={() => setListUser([])}
      />
      <div
        className={` 
        ${
          listUser.length && listUser.length > 0 ? "border-2 border-gray-300 mt-2" : ""
        }`}
      >
        {listUser.length > 0 &&
          listUser.map((user, index) => (
            <div
              onClick={() =>handleSelect(user)}
              className="w-full p-2 pt-4 pb-4 flex cursor-pointer hover:bg-gray-800"
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
    </div>
  );
};

export default SearchUser;
