import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 20, maxlength: 60 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, maxlength: 400 },
  role: { type: String, enum: ['System Admin', 'Normal User', 'Store Owner'], default: 'Normal User' },
});

const User = model('User', userSchema);
export default User;
