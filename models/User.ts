import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
  picture: {
    type: String,
    default: 'https://gnusson.net/assets/img/default.jpg',
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
