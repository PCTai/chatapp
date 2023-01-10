import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../customhook/useAuth";
import { db } from "../firebase/config";
import User from "./User";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { currentUser } = useAuth();

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      toast.error(err);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists() && currentUser.uid!==user.uid) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        console.log("up date");
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

    setUser(null);
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
        className="p-2 pl-4 text-black w-full outline-none"
      />
      <div className={`${user ? 'border-2 border-gray-300 mt-2' : ''}`}>
        {user && (
          <div 
          onClick={handleSelect}
            className="w-full p-2 pt-4 pb-4 flex cursor-pointer hover:bg-gray-800">
            <img
              src={user.photoURL}
              alt=""
              className="w-5 h-5 rounded-full mr-2"
            />
            <h3>{user.displayName}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUser;
