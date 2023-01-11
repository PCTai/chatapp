import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../customhook/useAuth";
import { db } from "../firebase/config";
import User from "./User";
import { chatActions } from "../Redux/slice/chatUser";
import { Link } from "react-router-dom";

const ListUser = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useAuth();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelect = (user) => {
    dispatch(chatActions.changeUser({ currentUser, user }));
  };
  //  console.log(Object.entries(chats));
  return (
    <div className="  mt-2 pb-6  max-h-48 overflow-y-auto">
      
      {chats && Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, index) => (
          <Link to={`${chat[1].userInfo.uid}`} key={chat[0]}>
            <User
              className="userChat"
              handleSelect={handleSelect}
              info={chat[1].userInfo}
              id={index}
            ></User>
          </Link>
        ))}
    </div>
  );
};

export default ListUser;
