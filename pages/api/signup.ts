// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/libs/dbConnect';
import Users from '@/models/User';
import bcrypt from 'bcrypt';

interface ResponseData {
  error?: string;
  msg?: string;
}

const validateEmail = (email: string): boolean => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (name: string, displayName: string, email: string, password: string) => {
  if (name.length < 3 && name.length > 40) {
    return { error: 'Full name must be between 3 and 40 characters' };
  }
  if (displayName.length <= 4) {
    return { error: 'Display name must have 4 or more characters' };
  }
  if (!validateEmail(email)) {
    return { error: 'Email is invalid' };
  }

  await dbConnect();
  const emailUser = await Users.findOne({ email: email });
  const displayNameUser = await Users.findOne({ displayName: new RegExp(`^${displayName}$`, 'i') });

  if (emailUser) {
    return { error: 'Email already exists' };
  }

  if (displayNameUser) {
    return { error: 'Display name already exists' };
  }

  if (password.length <= 8) {
    return { error: 'Password must have 8 or more characters' };
  }

  return null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  // validate if it is a POST
  if (req.method !== 'POST') {
    return res.status(200).json({ error: 'This API call only accepts POST methods' });
  }

  // get and validate body variables
  let { name, displayName, email, password } = req.body;

  // Lowercase email
  email = email.toLowerCase();

  const errorMessage = await validateForm(name, displayName, email, password);
  if (errorMessage) {
    return res.status(400).json(errorMessage as ResponseData);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // create new User on MongoDB
  const newUser = new Users({
    name,
    displayName,
    email,
    hashedPassword,
  });

  newUser
    .save()
    .then(() => res.status(200).json({ msg: 'Successfuly created new User: ' + newUser }))
    .catch((err: string) => res.status(400).json({ error: "Error on '/api/register': " + err }));
}
