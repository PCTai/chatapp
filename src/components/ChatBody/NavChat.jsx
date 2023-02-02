import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../customhook/useAuth";
import useUsers from "../../customhook/useUsers";
import { db } from "../../firebase/config";
import ModalInvite from "../ListGroup/ModalInvite";

const NavChat = () => {
  const [open, setOpen] = useState(false);
  const [dropdownUser, setDropdownUser] = useState(false);
  const [chat, setChat] = useState({});
  const { id } = useParams("id");
  const { users } = useUsers(chat);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
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
  const handleLeaveGroup = async () => {
    const docRef = doc(db, "rooms", id);
    const docSnap = await getDoc(docRef);
    
    const { members: membersRoom } = docSnap.data();
    

    const roomRef = doc(db, "rooms", id);
    await updateDoc(roomRef, {
      members: [
        ...membersRoom.filter((member) => member !== currentUser.uid),
      ],
    });
    if(membersRoom.filter((member) => member !== currentUser.uid).length===0){
      await deleteDoc(doc(db, "rooms", id));
    }

    navigate('/home');
    window.location.reload();
  };
  function handleUnFriend() {
    
  }
  return (
    <>
      <div className="flex justify-between items-center border-b-2 border-gray-300">
        <div className=" pb-2">
          <h3 className="text-xl">
            {chat.displayName ? chat.displayName : chat.name}
          </h3>
          <p>{chat.desc ? chat.desc : ""}</p>
        </div>
        {chat.uid ? (
          <button onClick={handleUnFriend} className="mr-4">
          <i className="fa-solid fa-user-xmark"></i>
        </button>
        ) : (
          <div className="flex items-center relative">
            <button onClick={handleLeaveGroup} className="mr-4">
              <i className="fa-solid fa-person-walking-arrow-right"></i>
            </button>
            <button onClick={() => setOpen((prev) => !prev)} className="mr-4">
              <i className="fa-solid fa-user-plus"></i>
            </button>
            {users.length > 0 && (
              <div
                className="flex "
                onClick={() => setDropdownUser((prev) => !prev)}
              >
                {users.map((user, index) => (
                  <img
                    key={index}
                    src={user.photoURL}
                    className={`h-6 w-6 rounded-full ${
                      index > 2 ? "hidden" : ""
                    }`}
                    alt={user.displayName}
                    title={user.displayName}
                  />
                ))}
                {users.length > 3 && (
                  <div className="h-6 w-6 rounded-full text-center bg-gray-500 text-white text-xs leading-6 font-semibold">
                    +{users.length - 3}
                  </div>
                )}
              </div>
            )}
            <ul
              className={`${
                dropdownUser ? "block" : "hidden"
              } absolute top-full mt-2 right-0 max-w-xs w-40 bg-white p-2 border max-h-40 overflow-y-auto`}
            >
              {users.map((user, index) => (
                <li key={2 + index} className=" flex pb-2">
                  <img
                    src={user.photoURL}
                    className={`h-6 w-6 rounded-full mr-2`}
                    alt={user.displayName}
                    title={user.displayName}
                  />{" "}
                  <span>{user.displayName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ModalInvite openModal={open} hideModal={setOpen} />
    </>
  );
};

export default NavChat;
