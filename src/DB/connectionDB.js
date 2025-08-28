import mongoose from 'mongoose'

export const checkConnectionDB = async() =>{
  await mongoose.connect(process.env.DB_URL).then(() =>{
    console.log('DB Connected Successfully')  
  }).catch((err) =>{
    console.log('Fail Connecting to DB');
  })
}
