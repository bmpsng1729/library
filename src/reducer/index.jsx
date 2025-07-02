//  we have to register all reducers here
import {combineReducers} from 'redux';
import authReducer  from '../slices/authSlice';
import  todoreducer from "../slices/todoSlice";
// import profileReducer from '../slices/profileSlice';

const rootReducer = combineReducers({
  // Add your reducers here
  auth:authReducer,
  todo:todoreducer,
//   profile:profileReducer,
});

export default rootReducer;