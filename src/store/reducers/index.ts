import {combineReducers} from '@reduxjs/toolkit';
// Reducer Imports
// import authReducer from 'src/store/slices/auth-slice';

const rootReducer = combineReducers({
  // Reducers
  //   auth: authReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
