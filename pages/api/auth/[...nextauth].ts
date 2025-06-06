import NextAuth, { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client'; // No longer needed here
import { prisma } from '@/lib/prisma'; // Import the singleton instance

// const prisma = new PrismaClient(); // No longer creating a new instance here

// Ensure NEXTAUTH_SECRET is set in production
if (!process.env.NEXTAUTH_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('NEXTAUTH_SECRET must be set in production');
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Use the imported singleton prisma instance
  providers: [
    EmailProvider({
      // server: { // Commented out to default to console logging in development
      //   host: process.env.EMAIL_SERVER_HOST,
      //   port: Number(process.env.EMAIL_SERVER_PORT),
      //   auth: {
      //     user: process.env.EMAIL_SERVER_USER,
      //     pass: process.env.EMAIL_SERVER_PASSWORD,
      //   },
      // },
      // from: process.env.EMAIL_FROM, // Commented out for console logging
      // maxAge: 24 * 60 * 60, // Optional: Time to live for the token, in seconds
      async sendVerificationRequest({ identifier: email, url, provider }) {
        // Development console logging
        if (process.env.NODE_ENV === 'development') {
          console.log(`\n\n--- DEVELOPMENT EMAIL ---`);
          console.log(`Sign in as ${email}`);
          console.log(`Verification URL: ${url}`);
          console.log(`-----------------------\n\n`);
          return;
        }
        
        // Production email sending would go here
        // throw new Error('Email sending not configured for production');
      }
    }),
    // Add other providers like Google, GitHub, etc., here
    // e.g., GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error User type from NextAuth might not directly have role
        token.role = user.role || 'CLIENT';
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Add custom sign-in logic here if needed
      // For example, check if user is allowed to sign in
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    error: '/auth/error',
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User ${user.email} signed in. New user: ${isNewUser}`);
    },
    async signOut({ session, token }) {
      console.log(`User signed out`);
    },
    async createUser({ user }) {
      console.log(`New user created: ${user.email}`);
    },
    async linkAccount({ user, account, profile }) {
      console.log(`Account linked for user: ${user.email}`);
    },
    async session({ session, token }) {
      // Called whenever a session is checked
    }
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions); 