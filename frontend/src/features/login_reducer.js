import { createSlice } from "@reduxjs/toolkit";
import { DOMAIN } from "../constants";
import { loadingActions} from './loading_reducer';

const LoginSlice = createSlice({
    name:'login',
    initialState:{isLoggedIn:false,accessToken :null,userid:null},
    reducers:{
        Login(state,action){
            if(!state.userid){
                state.userid = action.payload.userid;
            }
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
            if(action.payload.keepLogin){
                localStorage.setItem('refreshToken',action.payload.refreshToken);
            }else{
                localStorage.setItem('newRefreshToken',action.payload.refreshToken) // refresh token rotation need to be handled between diffrent tabs
                localStorage.removeItem('newRefreshToken');
                sessionStorage.setItem('refreshToken',action.payload.refreshToken);
            }
        },
        Logout(state,action){
            state.accessToken = null;
            state.isLoggedIn = false;
            state.userid = null;
            localStorage.setItem('logout',"any") 
            localStorage.removeItem("logout");
            localStorage.removeItem('refreshToken');
            sessionStorage.removeItem('refreshToken');
        },
    }
});

const loginReducer = LoginSlice.reducer;

export default loginReducer;

export const loginActions = LoginSlice.actions;

export const Login = (username,password,KeepMeLogin) => {
    return (async (dispatch)=>{

        dispatch(loadingActions.setLoading({value:true}));
        const auth_obj = {
            email:username,
            password:password
        };
        await fetch(DOMAIN+'/user/token/',{
            method:'POST',
            body:JSON.stringify(auth_obj),
            headers:{
                'Content-Type':'application/json'
            } 
        })
        .then(async (res) =>{
            if (res.ok){
                return await res.json()     
            }else{
                throw 'wrong credinteials';
            }
        })
        .then((data)=>{
            console.log(data.userId);
            dispatch(loginActions.Login({
                refreshToken:data.refresh,
                accessToken:data.access,
                userid:data.userId,
                keepLogin:KeepMeLogin
            }))
        })
        .catch((err)=>alert(err))
        .finally(()=>dispatch(loadingActions.setLoading({value:false})))
    })
}


export const Logout = (refreshToken) =>{
    return (async (dispatch) =>{
        const obj = {
            refresh:refreshToken
        }
        await fetch(DOMAIN+'/user/api/token/blacklist/',
        {
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }
        ).catch((err)=>alert(err));
        dispatch(loginActions.Logout());
    })
}

async function refreshFetch(token,SuccessCallback,KeepMeLogin,FailureCallback){
    const obj = {
        refresh:token
    }
    await fetch(DOMAIN+'/user/api/token/refresh/', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(async (res) => {
        if(res.ok){
            return await res.json()
        }else {
            throw 'invalid Token'
        }
    })
    .then((data) => {
        SuccessCallback(data);
    }).catch((err)=>{
        alert('Refresh Token Expired')
        if(KeepMeLogin){
            localStorage.removeItem('refreshToken')
        }else{
            sessionStorage.removeItem('refreshToken')
        }
        FailureCallback();
    })
}


export const refreshToken = (callback) =>{
    return (async (dispatch)=>{
        
        var token = await localStorage.getItem('refreshToken');
        var KeepMeLogin = true;
        if(!token){
            token = await sessionStorage.getItem('refreshToken');
            if(!token){return ;}
            KeepMeLogin = false;
        }
        const SuccessCallback = (data) =>{ 
            dispatch(loginActions.Login({
                refreshToken:data.refresh,
                accessToken:data.access,
                userid:data.userId,
                keepLogin:KeepMeLogin
            }));
            if(callback){
                callback(data.access)
            }
            
        }
        const FailureCallback = () =>{ 
            dispatch(loginActions.Logout());
        }
        await refreshFetch(token,SuccessCallback,KeepMeLogin,FailureCallback);
    })  
}