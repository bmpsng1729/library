const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        mobNumber: {
            type: Number,
            required: true,
        },
        fee: {
            type: Number,
            required: true,
            default: 600,

        },
        address: {
            type: String,
        },
        paidAmount: {
            type: Number,
            default: 0,
        },
        remAmount: {
            type: Number,
            default: 600,
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        seatReserved: {
            type: Boolean,
            default: false
        },

        preparingFor: {
            type: String,
            enum: [
                "UPSC",
                "SSC",
                "NDA",
                "Group D",
                "JEE/NEET",
                "Other",
            ],
            default: "Other"
        },
        accountType: {
            type: String,
            required:true,
            enum: ["admin", "student"],
            default: "student",
        },
        studyHr: {
            type: Number,
            required: true,
            default: 6,
        },
        joiningDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "profile",
        },
        isVerified:{
            type:Boolean,
            default:true,
        }

    },



);
module.exports = mongoose.model("user", userSchema);