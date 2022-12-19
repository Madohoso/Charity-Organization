import React, { useEffect, useState } from 'react';
import './App.css';
// import NavBar from './components/navbar/navbar';
// import {Footer} from './components/footer/footer';
// import HomePage from './components/main-page/HomePage';
// import ItemsPage from './components/item/ItemsPage'
import { Routes, Route, Link,useLocation } from "react-router-dom";
// import CartPage from './components/cart/cartPage';
// import { cartActions } from './features/cart_reducer';
import { useDispatch,useSelector } from 'react-redux';
import LoginPage from './components/authentication/loginPage';
import RegistrationPage from './components/authentication/registrationPage';
import {refreshToken ,loginActions} from './features/login_reducer';
// import {getOffers} from './features/offers_reducer';
import {sessionStorage_transfer} from './features/StorageManager';
// import {Spinner} from './components/spinner/spinner';
// import OrdersPage from './components/orders/ordersPage';
// import PrevCartPage from './components/cart/PrevCartPage';
// import ItemPage from './components/item/itemPage';
// import {NavigatorComponent} from './components/navigator/Navigator'

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
      {/* {!HideHeaders&& <NavBar />}
      {isLoading&&(<Spinner />) }
      {!HideHeaders&& <NavigatorComponent />}  */}
      <Routes>
        <Route path='/' exact element={(<h1>Logged in successfully</h1>)} />
        {/* <Route path='/items' exact element={<ItemsPage />} /> */}
        {/* <Route path='/cart' exact element={<CartPage />} /> */}
        {/* <Route path='/cart/:id' exact element={<PrevCartPage />} /> */}
        {/* <Route path='/item/:id' exact element={<ItemPage />} /> */}
        <Route path='/login' exact element={<LoginPage />} />
        <Route path='/register' exact element={<RegistrationPage />} />
        {/* <Route path='/prev-orders' exact element={<OrdersPage />} /> */}
      </Routes>
      {/* {!HideHeaders&& <Footer/>} */}
    </div>
  );
}

export default App;
