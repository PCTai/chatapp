import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    open: false,
    openInvite : false
  };

const addRoomMD = createSlice({
    name: 'room',
    initialState,
    reducers: {
        change:(state, action) =>{
          state.open= !state.open;
        },
        changeInvite : (state, action)=>{
          state.openInvite= !state.openInvite;
        },
        reset: (state, action) =>{
          state.open= false;
          state.openInvite= false;
        }
    }
})


export const addRoomMDActions = addRoomMD.actions;

export default addRoomMD.reducer;