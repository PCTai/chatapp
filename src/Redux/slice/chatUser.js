import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    chatId: "null",
    user: {},
    room: {}
  };

const chatUser = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        changeUser:(state, action) =>{
          const {user, currentUser} =action.payload;
          state.user=user;
          state.chatId=
            currentUser.uid > user.uid
              ? currentUser.uid + user.uid
              : user.uid + currentUser.uid;
        },
        changeRoom: (state, action)=>{
          // console.log("choose room", action.payload)
          state.user={};
          state.chatId = action.payload.id;
          state.room=action.payload;
        },
        reset: (state, action) =>{
          state.user= {};
          state.chatId= "null";
        }
    }
})


export const chatActions = chatUser.actions;

export default chatUser.reducer;