 import {createSlice} from "@reduxjs/toolkit"
 const initialState={
        
    // token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    // userData:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):"empty",
    // //status:userData?true:false,
    token:null,
    userData:JSON.parse(localStorage.getItem("userData")),
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
         state.isLoggedin=true;
         state.userData=action.payload.user;
         //console.log("from authSlice,userdata",action.payload.user);
         state.token=action.payload.token;
           localStorage.setItem("isLoggedin", JSON.stringify(true))
           localStorage.setItem("userData",JSON.stringify(state.userData));
       },
       logout:(state)=>{
        state.isLoggedin=false;
         state.token=null;
         state.userData=null;
          localStorage.setItem("isLoggedin",JSON.stringify(false));
          localStorage.setItem("userData",JSON.stringify(""));
       },
       signup:(state)=>{
         state.isRegistered=true;
       }
      
    },
 });

export const{login,logout,signup}=authSlice.actions;
export default authSlice.reducer;

// data in the userData