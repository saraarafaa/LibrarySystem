import { nanoid } from "nanoid";
import userModel, { userRole } from "../../DB/models/userModel.js"
import { Compare } from "../../utils/Hash/compare.js";
import { Hash, generateToken, verifyToken } from "../../utils/index.js"
import { eventEmitter } from "../../utils/emailEvents/index.js";


//------------------------ REGISTER -------------------------
export const register = async(req, res, next) =>{
   const {email, name, password, role} = req.body

   if(await userModel.findOne({email}))
    throw new Error("User Already exists", {cause: 409});

   const hashedPassword = await Hash({plainText: password, saltRound: process.env.SALT_ROUNDS})

   eventEmitter.emit('sendEmail', {email})

   const user = await userModel.create({name, email, password: hashedPassword, role})

   return res.status(201).json({message: 'User Created Successfully', user})
}

//------------------------ CONFIRM EMAIL -------------------------
export const confirmEmail = async(req, res, next) =>{
   const {token} = req.params
   if(!token)
    throw new Error("Token Not Sent", {cause: 404});

   const decode = await verifyToken({token, SIGNITURE: process.env.SIGNITURE})
   const user = await userModel.findOne({email: decode.email, confirmed: false})

   if(!user)
    throw new Error("User Not Found OR already confirmed", {cause: 400});

   user.confirmed = true
   await user.save()

   return res.status(200).json({message: 'Confirmed'})  
}

//------------------------ LOGIN -------------------------
export const login = async(req, res, next) =>{
  const {email, password} = req.body

  const user = await userModel.findOne({email})
  if(!user)
    throw new Error("User Not Found", {cause: 404});

  const validPassword = await Compare({plainText: password, cipherText: user.password})
  if(!validPassword)
    throw new Error("InCorrect password", {cause: 401});

  const accessToken = await generateToken({payload: {id: user._id, email: user.email},
    SIGNITURE: user.role == userRole.admin ? process.env.ACCESS_TOKEN_ADMIN : process.env.ACCESS_TOKEN_MEMBER ,
    options: {expiresIn: '1h', jwtid: nanoid()}
  })

  const refreshToken = await generateToken({payload: {id: user._id, email: user.email},
    SIGNITURE: user.role == userRole.admin ? process.env.REFRESH_TOKEN_ADMIN : process.env.REFRESH_TOKEN_MEMBER ,
    options: {expiresIn: '1y', jwtid: nanoid()}
  
  })

  return res.status(200).json({message: 'User LoggedIn Successfully', accessToken, refreshToken}) 

}

//------------------------ GET PROFILE -------------------------
export const getProfile = async(req, res, next) =>{
  const user = await userModel.findById(req.user._id).select("-password")
  return res.status(200).json({message: 'User Profile Retreived Successfully', user})

    
}
