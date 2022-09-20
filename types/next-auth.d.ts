import NextAuth, { DefaultSession, DefaultProfile, DefaultUser } from 'next-auth';
declare module 'next-auth' {
  interface Session {
    user?: {
      displayName?: string | null | undefined;
    } & DefaultSession['user'];
  }
}

// If we're using JWTs with the `uid` field
declare module 'next-auth/jwt/' {
  interface JWT {
    displayName?: string | null | undefined;
  }
}

declare module 'next-auth/user' {
  interface User {
    user?: {
      displayName?: string | null | undefined;
    } & DefaultUser['user'];
  }
}