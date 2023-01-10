import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import chatUser from "./slice/chatUser";
import addRoomMD from "./slice/addRoomMD";



const store = configureStore({
    reducer :{
        'chatSlice' :chatUser,
        'room' :addRoomMD,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})




export default store;