import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    user: {},
    chat: {},
    users: []
  };

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setUser:(state, action) =>{
          
          state.user=action.payload;
          
        },
        setChat:(state, action) =>{
          const {chat} =action.payload;
          state.chat=chat;
          
        },
        setUsers: (state, action)=>{
          const data = action.payload.map((item ) =>{ console.log(item) ; return item});
          state.users= data;
          // console.log(action.payload)
        },
        reset: (state, action) =>{
          state.user= {};
          state.chat= {};
          state.users= []
        }
    }
})


export const appActions = appSlice.actions;

export default appSlice.reducer;