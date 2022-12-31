import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link,useLocation } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import LoginPage from './components/authentication/loginPage';
import RegistrationPage from './components/authentication/registrationPage';
import {refreshToken ,loginActions} from './features/login_reducer';
import {sessionStorage_transfer} from './features/StorageManager';
import OrdersPage from './components/orders/ordersPage';
import {Spinner} from './components/spinner/spinner';
import EventPage from './components/event/EventPage';

function App() {

  const dispatch = useDispatch();
  const [HideHeaders,setHideHeaders] = useState(false);

  useEffect(()=>{
    if (!sessionStorage.getItem('refreshToken') && !localStorage.getItem('refreshToken')) {
      localStorage.setItem('getSessionStorage', 'foobar');
      localStorage.removeItem('getSessionStorage', 'foobar');
    };
    // dispatch(cartActions.loadCart());
    // dispatch(getOffers());
    // dispatch(refreshToken());

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
  // useEffect(()=>{  
  //   setHideHeaders(path==='/login' || path==='/register')
  // },[path])

  return (
    <div className="App">
      
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
