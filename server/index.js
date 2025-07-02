const express=require("express");
const app=express();
const db=require("./config/database");
require("dotenv").config();
const port=process.env.PORT ||4000;
const cookieParser=require("cookie-parser");
const cors=require("cors");
 const{connectToCloudinary}=require("./config/connectToCloudinary")

// import all routes here
 const userRoutes=require("./routes/user");
 const paymentRoutes=require("./routes/payment");
// connect to cloudinary
// connect cors
// cookie-parser


//db connect
db.connect();

// middleware
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true,
    optionsSuccessStatus:200,
   methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
}
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
connectToCloudinary();
// connect to cloudinary
connectToCloudinary();

// default route
app.get("/",(req,res)=>{
    return res.json({
        message:"server is running on port 4000"
    })
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

// write all routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/auth/student",paymentRoutes);
