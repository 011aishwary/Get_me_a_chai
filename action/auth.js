import NextAuth from 'next-auth'  
import GitHubProvider from "next-auth/providers/github";
import User from '../models/User'
import connectDB from '../db/connectDB';


export const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET

    }),




    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in

  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider == "github") {




        // CHek if the user already exists      
        // console.log(user)
        await connectDB(); // Make sure this runs before any User.findOne or User.save


        const currentuser = await User.findOne({ email: user.email })
        // console.log(currentuser)
        // console.log(user.name)
        if (!currentuser) {
          // console.log(User)
          const newUser = await new User({
            email: user.email,

            username: user.name,

          })
          await newUser.save()
          user.name = newUser.username;
          // console.log(newUser)

        }
      }
      else {
        user.name = currentuser.name;
      }

      return true;
    }

  },
  async session({ session, user, token }) {
    const dbUser = await User.findOne({ email: session.user.email })
    console.log(dbUser)
    session.user.name = dbUser.username
    return session
  }
}



export default authoptions;