import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./lib/schemas/loginSchemas"
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";
 
export default { providers: [Credentials({
    name:'credentials', 
    async authorize (creds) {
        const validated = loginSchema.safeParse(creds);
        if (validated.success){
            const {email , password}= validated.data;
            const user= await getUserByEmail(email);
              // Check if user exists and password matches
          if (!user || !(await compare(password, user.passwordHash))) {
            return null;  // Return null if user doesn't exist or password doesn't match
          }
          // If user exists and password matches, return user object
          return user;
        }
return null;
    }
    
})] } satisfies NextAuthConfig