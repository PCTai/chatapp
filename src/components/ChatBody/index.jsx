import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Messsage from "../Messsage";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import useAuth from "../../customhook/useAuth";
import { useParams } from "react-router-dom";
import { addRoomMDActions } from "../../Redux/slice/addRoomMD";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chat, setChat] = useState({});
  const [img, setImg] = useState(null);
  const { currentUser } = useAuth();
  const messageListRef = useRef(null);
  const { id } = useParams("id");
  const dispatch = useDispatch();


  useEffect(() => {
    // console.log(id);
    setChat({});
    const res = onSnapshot(doc(db, "chats", id), (d) => {
      if (d.exists()) {
        console.log(d.data());
        setMessages(d.data().messages);
        
      } else {
        const idd= currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;
        console.log(idd);
        onSnapshot(doc(db, "chats", idd), (doc) => {
          setMessages(doc.data().messages);
        })
      }
    });
    const getUser = async () => {
      let docRef = doc(db, "users", id);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setChat(docSnap.data());
      } else {
        docRef = doc(db, "rooms", id);
        docSnap = await getDoc(docRef);
        setChat(docSnap.data())
      }
    };
    getUser();
    return () => {
      res();
      // getUser();
    };
  }, [id, currentUser]);
  const handleSend = async (e) => {
    e.preventDefault();
    if (img) {
      // const storageRef = ref(storage, uuid());
      // const uploadTask = uploadBytesResumable(storageRef, img);
      // uploadTask.on(
      //   (error) => {
      //     //TODO:Handle Error
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       await updateDoc(doc(db, "chats", data.chatId), {
      //         messages: arrayUnion({
      //           id: uuid(),
      //           text,
      //           senderId: currentUser.uid,
      //           date: Timestamp.now(),
      //           img: downloadURL,
      //         }),
      //       });
      //     });
      //   }
      // );
    } else {
      if (text.trim() !== "") {
        await updateDoc(doc(db, "chats", id), {
          messages: arrayUnion({
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            url: currentUser.photoURL,
          }),
        });
        setText("");
      }
    }
  };
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full p-6 ">
      {id !== "null" ? (
        <>
          <div className="flex justify-between items-center border-b-2 border-gray-300">
            <div className="">
              <h3 className="text-xl">
                {chat.displayName ? chat.displayName : chat.name}
              </h3>
              <p>{chat.desc ? chat.desc :""}</p>
            </div>
            {chat.uid ? (
              <></>
            ) : (
              <div className="flex">
                <button 
                  onClick={() => dispatch(addRoomMDActions.changeInvite())}
                  className="mr-2">
                  <i className="fa-solid fa-user-plus"></i>
                  <span className="ml-2 mr-2">Invite</span>
                </button>
                {/* <div className="flex">
            <div className="rounded-full w-5 h-5 bg-white">
              <img className='rounded-full w-5 h-5' src="" alt="" />
            </div>
            <div className="rounded-full w-5 h-5 bg-white">
              <img className='rounded-full w-5 h-5' src="" alt="" />
            </div>
            <div className="rounded-full w-5 h-5 bg-white">
              <img className='rounded-full w-5 h-5' src="" alt="" />
            </div>
          </div> */}
              </div>
            )}
          </div>
          <div
            className="flex-1 overflow-y-auto mt-2 pr-4"
            ref={messageListRef}
          >
            {
              messages.map((message, index) => (
                <Messsage key={index} message={message}/>
              )
            )}
          </div>
          <form action="" onSubmit={handleSend}>
            <div className="flex pt-4 border-t-2 border-gray-300">
              <input
                className="flex-1 mr-4 p-4 pl-4 pr-4 border-2 border-gray-300 outline-none"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button className="p-4 pl-6 pr-6 bg-gray-900 text-white ">
                Send
              </button>
            </div>
          </form>
        </>
      ) : (
        <h3 className="p-4 bg-gray-500 text-white rounded-md">
          Please chooes friend or group !
        </h3>
      )}
    </div>
  );
};

export default ChatBody;
