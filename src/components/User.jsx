import React from "react";
import { useParams } from "react-router-dom";

const User = ({ info, handleSelect }) => {
  const { "*": id } = useParams("id");

  return (
    <div
      onClick={() => handleSelect(info)}
      className={`w-full p-2  flex items-center cursor-pointer hover:bg-gray-800 ${
        id === info.uid ? "bg-gray-600" : ""
      }`}
    >
      <img
        src={info?.photoURL}
        alt=""
        className="w-10 h-10 rounded-full mr-2"
      />
      <h3>{info?.displayName}</h3>
    </div>
  );
};

export default User;
