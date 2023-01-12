import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import NavChat from "./NavChat";

const ChatBody = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useAuth();
  const messageListRef = useRef(null);
  const {id}   = useParams("id");
  const idd = useMemo(() =>{
    return currentUser.uid > id ? currentUser.uid + id : id + currentUser.uid;
  },[id, currentUser])

  useEffect(() => {
    
    const res = onSnapshot(doc(db, "chats", id), (d) => {
      // console.log(id);
      if (d.exists()) {
        // console.log(d.data());
        setMessages(d.data().messages);
        
      } else {
        onSnapshot(doc(db, "chats", idd), (doc) => {
          setMessages(doc.data().messages);
        })
      }
    });
    
    return () => {
      res();
      // getUser();
    };
  }, [id, currentUser, idd]);
  const handleSend = async (e) => {
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, `images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if(id.length>13){
              
              await updateDoc(doc(db, "chats", idd), {
                messages: arrayUnion({
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                  url :currentUser.photoURL,
                }),
              });
            }
            else{
              await updateDoc(doc(db, "chats", id), {
                messages: arrayUnion({
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                  url: currentUser.photoURL,
                }),
              });
            }
          });
        }
      );
      setImg(null);
      setText("");
    } else {
      if (text.trim() !== "") {
       
        if(id.length>13){
          
          await updateDoc(doc(db, "chats", idd), {
            messages: arrayUnion({
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              url: currentUser.photoURL,
            }),
          });
          
        }else{
          // console.log("room");
          await updateDoc(doc(db, "chats", id), {
            messages: arrayUnion({
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              url: currentUser.photoURL,
            }),
          });
        }

        
        setText("");
      }
    }
  };

  const handleChooseImage =(e ) =>{
    setImg(e.target.files[0]);
    e.target.value= null;
  }
  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight +50;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-full p-6 ">
      {id !== "null" ? (
        <>
          <NavChat />
          <div
            className="flex-1 scroll-smooth overflow-y-auto mt-2 pr-4"
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

              <div className="mt-4">
              <label htmlFor="file" className='flex items-center text-gray-900'> <i className="fa-regular fa-image text-2xl mr-4"></i></label>
              <input
                 
                type="file"
                id='file'
                onChange={handleChooseImage}
                className="hidden"
              />
            </div>
              <button className="p-4 pl-6 pr-6 bg-gray-900 text-white rounded-sm ">
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
