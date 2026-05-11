import mongoose from 'mongoose'

const userSchema =
new mongoose.Schema({

  name:String,

  department:String,

  phone:String,

  email:String,

  blood:String,

  password:String,

})

export default mongoose.model(
  'User',
  userSchema
)