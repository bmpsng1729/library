 import {createSlice} from "@reduxjs/toolkit"
 const initialState={
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
    userData:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):"empty",
    //status:userData?true:false,
  
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
         state.status=true;
         state.userData=action.payload.user;
         //console.log("from authSlice,userdata",action.payload.user);
         state.token=action.payload.token;
       },
       logout:(state)=>{
         state.status=false;
         state.token=null;
         state.userData=null;
       }
      
    },
 });

export const{login,logout}=authSlice.actions;
export default authSlice.reducer;

// data in the userData