import mongoose from "mongoose";

export const userRole = {
  admin: "admin",
  member: "member"
}

const userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: Object.values(userRole),
    required: true
  },
  confirmed:{
    type: Boolean,
    default: false
  }

},{
  timestamps: {createdAt: true, updatedAt: false},
})

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel