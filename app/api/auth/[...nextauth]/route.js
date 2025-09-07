
import {authoptions} from "../../../../action/auth"
import NextAuth from 'next-auth'

const handler = NextAuth(authoptions)

// console.log("🔄 NextAuth route loaded") 

export { handler as GET, handler as POST }

// export { authoptions as GET, authoptions as POST }



