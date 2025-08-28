import bcrypt from 'bcrypt'

export const Hash = async({plainText, saltRound = process.env.SALT_ROUNDS}) =>{
  return bcrypt.hashSync(plainText, +saltRound)
}