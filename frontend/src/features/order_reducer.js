import { DOMAIN } from "../constants"
import { createSlice } from "@reduxjs/toolkit";
import { loadingActions } from "./loading_reducer";

const orderSlice = createSlice({
    name:'order',
    initialState:{prevorders:[]},
    reducers:{
        setPrevOrders(state,action){
            state.prevorders = action.payload.orders;
        },
        resetPrevOrder(state){
            state.prevorders = [];
        }
    }
})

const orderReducer =  orderSlice.reducer;
export default orderReducer;

export const orderActions = orderSlice.actions;

export const getPreviousOrders = (user_id,token,refreshcallback) =>{
    
    return (async (dispatch) => {

        dispatch(
            loadingActions.setLoading({value:true})
        )

        await fetch(DOMAIN+'/event/Events/',{
            headers:{
                'Authorization':"Bearer "+ token,
            }
        }).then(async (res)=>{
            if(res.ok){
                return await res.json()
            }else if (res.status ===401){
                if(refreshcallback){
                    refreshcallback()
                }
            }else{
                alert("some error happens please try again")
            }
        }).then((data)=>{
            dispatch(orderActions.setPrevOrders({orders:data}))
        }).catch((err)=>alert(err))
        
        dispatch(
            loadingActions.setLoading({value:false})
        )
    })
    
}