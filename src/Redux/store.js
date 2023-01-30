import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import chatUser from "./slice/chatUser";
import addRoomMD from "./slice/addRoomMD";
import appSlice from "./slice/appSlice";



const store = configureStore({
    reducer :{
        'chatSlice' :chatUser,
        'room' :addRoomMD,
        'app' : appSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})




export default store;