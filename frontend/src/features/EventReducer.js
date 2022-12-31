import { createSlice } from "@reduxjs/toolkit";
import { loadingActions } from "./loading_reducer";

const eventSlice = createSlice({
    name:'event',
    initialState:{event:{}},
    reducers:{
        setEvent(state,action){
            state.event = action.payload.event;
        }
    }
})

const eventReducer =  eventSlice.reducer;
export default eventReducer;

export const eventActions = eventSlice.actions;
