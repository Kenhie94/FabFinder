import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true})

const UserModel = models.user || model('post', userSchema)

export default UserModel;