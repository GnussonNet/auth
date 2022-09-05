import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  displayName: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 20,
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
  image: {
    type: String,
    default: 'https://gnusson.net/assets/img/default.jpg',
  },
});

const Users = mongoose.models.Users || mongoose.model('Users', usersSchema);
export default Users;
