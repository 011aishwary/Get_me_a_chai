import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from '../models/User'
import connectDB from '../db/connectDB';


export const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github" || account.provider == "google") {
        // Connect to DB
        await connectDB();
        
        // Check if the user already exists
        const currentUser = await User.findOne({ email: user.email });
        
        if (!currentUser) {
          // Create new user if not exists
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0], // Use email prefix as default username
            name: user.name, // Store the name also
          });
          await newUser.save();
        } 
        return true;
      }
      return true; 
    },
    async session({ session, user, token }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
        // You can add other properties to session here if needed
      }
      return session;
    }
  }
};

export default authoptions;