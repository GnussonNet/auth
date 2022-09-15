import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/libs/mongodb';
import dbConnect from '@/libs/dbConnect';
import { compare } from 'bcrypt';
import User from '@/models/User';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        await dbConnect();

        const user = await User.findOne({
          email: credentials?.email.toLowerCase(),
        });

        // Email not found
        if (!user) {
          if (credentials?.email.includes('@')) {
            throw new Error('Email or password is incorrect');
          } else {
            throw new Error('Email or password is incorrect');
          }
        }

        // Check hased password with DB hashed password
        const isPasswordCorrect = await compare(credentials!.password, user.hashedPassword);

        // Incorrect password
        if (!isPasswordCorrect) {
          throw new Error('Email or password is incorrect');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available      
      if (user) {
        token.id = user.id;
        token.displayName = user.displayName;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  pages: {
    signIn: 'auth/signin',
  },
  debug: process.env.NODE_ENV === 'development',
});
