import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link,useLocation } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import LoginPage from './components/authentication/loginPage';
import RegistrationPage from './components/authentication/registrationPage';
import {refreshToken ,loginActions, Logout} from './features/login_reducer';
import {sessionStorage_transfer} from './features/StorageManager';
import OrdersPage from './components/orders/ordersPage';
import {Spinner} from './components/spinner/spinner';
import EventPage from './components/event/EventPage';
import signoutphoto from "./imgs/sign-out.svg";

const LogoutIcon = () => {
  const dispatch = useDispatch();
  return (
      <Link onClick={()=>{dispatch(loginActions.Logout());console.log('clicked')}} to={{pathname:"/login"}} className="d-flex grouped">
          <img style={{width:"30px",height:"30px"}} src={signoutphoto} alt="logo" />
          <span className="small">Logout</span>
      </Link>
  )
}

function App() {

  const dispatch = useDispatch();
  const [HideHeaders,setHideHeaders] = useState(false);

  useEffect(()=>{
    if (!sessionStorage.getItem('refreshToken') && !localStorage.getItem('refreshToken')) {
      localStorage.setItem('getSessionStorage', 'foobar');
      localStorage.removeItem('getSessionStorage', 'foobar');
    };
    
    function storageListener(event){
      sessionStorage_transfer(event,()=>dispatch(refreshToken()),()=>dispatch(loginActions.Logout()))
    }

    window.addEventListener("storage", storageListener,false);
    return (()=>{
      window.removeEventListener("storage", storageListener);
    })

  },[])

  const path =  useLocation().pathname;
  const isLoading = useSelector((state)=>state.loading.isLoading);
  const isLoggedIn = useSelector((state)=> state.login.isLoggedIn);


  
  return (
    <div className="App">
      {isLoggedIn && (<div className='column'>
        <LogoutIcon />
      </div>)}
         
      {isLoading&&(<Spinner />)}
      <Routes>
        <Route path='/' exact element={(<OrdersPage />)} />
        <Route path='/login' exact element={<LoginPage />} />
        <Route path='/register' exact element={<RegistrationPage />} />
        <Route path='/event/:id' element={<EventPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
