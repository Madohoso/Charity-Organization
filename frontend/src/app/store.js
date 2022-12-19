import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '../features/loading_reducer';
import loginReducer from '../features/login_reducer';


export const store = configureStore({
  reducer: {
    loading:loadingReducer,
    login:loginReducer,
  },
});
