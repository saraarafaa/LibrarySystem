import { EventEmitter } from 'events'
import { generateToken } from '../Token/generateToken.js'
import { sendEmail } from '../../service/sendEmail.js'

export const eventEmitter = new EventEmitter()

eventEmitter.on('sendEmail', async(data) =>{
  const {email} = data

  const token = await generateToken({payload: {email}, SIGNITURE: process.env.SIGNITURE, options: {expiresIn: 60*3}})
  const link = `http://localhost:3000/users/confirmEmail/${token}`

  const isSent = await sendEmail({to: email, subject: 'Confirm Your Email', html: `<a href=${link}>Click To Confirm Email</a>`})
  if(!isSent)
    throw new Error("Fail sending Email", {cause: 400});
    
})