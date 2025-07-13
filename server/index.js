const express=require("express");
const app=express();
const db=require("./config/database");
require("dotenv").config();
const port=process.env.PORT ;
const cookieParser=require("cookie-parser");
const cors=require("cors");
 const{connectToCloudinary}=require("./config/connectToCloudinary")

// import all routes here
 const userRoutes=require("./routes/user");
 const paymentRoutes=require("./routes/payment");
 const adminRoutes=require("./routes/admin");
 const studentRoutes=require("./routes/student");
// connect to cloudinary
// connect cors
// cookie-parser


//db connect
db.connect();

// middleware
const corsOptions = {
    origin:"https://library-r15c.onrender.com/",
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
app.listen(port,'0.0.0.0',()=>{
    console.log(`server is running on port ${port}`);
});

// write all routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/auth/payment",paymentRoutes);
app.use("/api/v1/auth/student",studentRoutes)
app.use("/api/v1/auth/admin/",adminRoutes);
