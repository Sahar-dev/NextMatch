import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { prisma } from "./lib/prisma"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks:{
//this is how u get information inside ur token , u can add additional claims (like roles ) like here we basically added the ID
async session({token, session}){
  if(token.sub && session.user){
    session.user.id = token.sub;
  }
  return session;
}
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})