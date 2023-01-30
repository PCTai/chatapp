import React from "react";
import useAuth from "../customhook/useAuth";
import { formatRelative } from "date-fns/esm";

const Messsage = ({ message }) => {
  const { currentUser } = useAuth();

  function formatDate(seconds) {
    let formattedDate = "";

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  }
  return (
    <div
      className={`flex flex-col ${
        currentUser.uid === message.senderId ? "items-end" : ""
      } mb-4`}
    >
      <div className={`flex `}>
        <div
          className={`flex max-w-2xl   ${
            currentUser.uid === message.senderId ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex min-w-max ${
              currentUser.uid === message.senderId ? "ml-4" : "mr-4"
            }  flex-col-reverse`}
          >
            <img
              className="w-8 h-8 rounded-full"
              src={
                currentUser.uid === message.senderId
                  ? currentUser.photoURL
                  : message.url
              }
              alt={message.name}
            />
          </div>
          <div className="">
            {message.img && <img  src={message.img} className="rounded-sm mb-1 border max-w-sm" alt="img" />}
            {message.text && (
              <div className={`flex ${currentUser.uid === message.senderId ? 'justify-end' :''}`}>
                <div className="border-2 rounded-md bg-slate-200 border-gray-300 p-2 w-fit ">
                {message.text}
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <span className="text-sm pt-2">{formatDate(message.date.seconds)}</span>
    </div>
  );
};

export default Messsage;
