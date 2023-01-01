import { configureStore } from '@reduxjs/toolkit';
import eventReducer from '../features/EventReducer';
import loadingReducer from '../features/loading_reducer';
import loginReducer from '../features/login_reducer';
import orderReducer from '../features/order_reducer';

export const store = configureStore({
  reducer: {
    loading:loadingReducer,
    login:loginReducer,
    order:orderReducer,
    event:eventReducer
  },
});
