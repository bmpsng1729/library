//  we have to register all reducers here
import {combineReducers} from 'redux';
import authReducer  from '../slices/authSlice';
// import profileReducer from '../slices/profileSlice';

const rootReducer = combineReducers({
  // Add your reducers here
  auth:authReducer,
//   profile:profileReducer,
});

export default rootReducer;