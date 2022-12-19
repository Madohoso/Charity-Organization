import {createSlice} from '@reduxjs/toolkit';


const loadingSlice = createSlice({
    name:'loading',
    initialState:{isLoading:false},
    reducers:{
        setLoading(state,action){
            state.isLoading = action.payload.value;
        }
    }
})

const loadingReducer = loadingSlice.reducer; 

export default loadingReducer;

export const loadingActions = loadingSlice.actions;