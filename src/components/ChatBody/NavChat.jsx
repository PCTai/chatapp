import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import useUsers from "../../customhook/useUsers";
import { db } from "../../firebase/config";
import { addRoomMDActions } from "../../Redux/slice/addRoomMD";

const NavChat = () => {
  const dispatch = useDispatch();
  const [chat, setChat] = useState({});
  const { id } = useParams("id");
  const { users } = useUsers(chat);

  useEffect(() => {
    setChat({});

    const getUser = async () => {
      let docRef = null;
      let docSnap = null;
      if (id.length < 20) {
        docRef = doc(db, "rooms", id);
        docSnap = await getDoc(docRef);
        setChat(docSnap.data());
      } else {
        docRef = doc(db, "users", id);
        docSnap = await getDoc(docRef);
        setChat(docSnap.data());
      }
    };
    getUser();
    return () => {
      // getUser();
    };
  }, [id]);

  return (
    <div className="flex justify-between items-center border-b-2 border-gray-300">
      <div className="">
        <h3 className="text-xl">
          {chat.displayName ? chat.displayName : chat.name}
        </h3>
        <p>{chat.desc ? chat.desc : ""}</p>
      </div>
      {chat.uid ? (
        <></>
      ) : (
        <div className="flex items-center">
          <button
            onClick={() => dispatch(addRoomMDActions.changeInvite())}
            className="mr-2"
          >
            <i className="fa-solid fa-user-plus"></i>
            <span className="ml-2 mr-2">Invite</span>
          </button>
          {users.length > 0 && (
            <div className="flex">
              {users.map((user, index) =>(
                <img key={index} src={user.photoURL} className={`h-6 w-6 rounded-full ${index > 2 ? "hidden" : ""}`} alt={user.displayName} title={user.displayName} />
              ))}
              {users.length> 2 && <div className="h-6 w-6 rounded-full text-center bg-gray-500 text-white text-sm font-semibold">+{users.length-3}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavChat;
