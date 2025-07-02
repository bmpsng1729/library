 import {createSlice} from "@reduxjs/toolkit"
 const initialState={
        
    // token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    // userData:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):"empty",
    // //status:userData?true:false,
    token:null,
    userData:"",
    isRegistered:JSON.parse(localStorage.getItem("isRegistered")),
    isLoggedin:JSON.parse(localStorage.getItem("isLoggedin")),
  
 };
 const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
      //  setToken:(state,action)=>{
      //     state.token=action.payload.token;
      //   //   localStorage.setItem("token",JSON.stringify(action.payload));
      //   // TODO:-set token in the local storage
        
      //  },
    
       login:(state,action)=>{
         state.isLoggedIn=true;
         state.userData=action.payload.user;
         //console.log("from authSlice,userdata",action.payload.user);
         state.token=action.payload.token;
       },
       logout:(state)=>{
        state.isLoggedIn=false;
         state.token=null;
         state.userData=null;
       },
       signup:(state)=>{
         state.isRegistered=true;
       }
      
    },
 });

export const{login,logout,signup}=authSlice.actions;
export default authSlice.reducer;

// data in the userData