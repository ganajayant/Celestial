import mongoose from "mongoose";

const optSchema = mongoose.Schema({
    email: String,
    OTP: String,
    OTPTime: Number,
})

const OTP = mongoose.model('OTP', optSchema);

export default OTP;