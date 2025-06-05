import NextAuth, { type NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient } from '@prisma/client'; // No longer needed here
import { prisma } from '@/lib/prisma'; // Import the singleton instance

// const prisma = new PrismaClient(); // No longer creating a new instance here

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
        // Log the verification URL to the console instead of sending an email
        console.log(`\n\n--- DEVELOPMENT EMAIL ---`);
        console.log(`Sign in as ${email}`);
        console.log(`Verification URL: ${url}`);
        console.log(`-----------------------\n\n`);
        // Note: In a real app, you would use an email sending service here
        // For example, with Nodemailer:
        // const { host } = new URL(url);
        // await transport.sendMail({
        //   to: email,
        //   from: provider.from,
        //   subject: `Sign in to ${host}`,
        //   text: text({ url, host }),
        //   html: html({ url, host, theme }),
        // });
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
        session.user.role = token.role as string; // Assuming role is stored in the token
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error User type from NextAuth might not directly have role without adapter specific extension
        token.role = user.role; // Persist role to the JWT
      }
      return token;
    },
  },
  pages: {
    // signIn: '/auth/signin', // If you want a custom sign-in page
    // verifyRequest: '/auth/verify-request', // Used for Email provider's "check your email" page
  },
  // Enable debug messages in the console if you are having problems
  // debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions); 