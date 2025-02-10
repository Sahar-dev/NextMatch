'use server';

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schemas/loginSchemas";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchemas";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { AuthError } from "next-auth";

export async function signInUser(data:LoginSchema) : Promise<ActionResult<string>>{
    try {
        const result = await signIn('credentials',{
            email: data.email,
            password: data.password,
            redirect: false
        })
        console.log(result)
        return {status:'success', data: 'Logged in'}
    } catch (error) {
        console.log(error);
        if (error instanceof AuthError){
            switch (error.type) {
                case 'CredentialsSignin':
                    return {status:'error', error:'Invalid credentials'}
                    break;
                default:
                    return {status:'error',error: 'something went wrong'};
            }
        }else{
            return{status:'error', error:'Something else went wrong'}
        }
    }
    
}

export async function signOutUser() {
    await signOut( { redirectTo:'/'});
}


export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>>{
try {
   
    const validated = registerSchema.safeParse(data);
    if (!validated.success){
        //  throw new Error(validated.error.errors[0].message);
         return {status:'error' ,error: validated.error.errors}
    }
    const {name, email, password} = validated.data;
    const hashedpassword= await bcrypt.hash(password, 10);
    const existinguser = await prisma.user.findUnique({
        where: {email}
    });

    if (existinguser) return {status:'error' ,error: 'user already exist'};
    const user= prisma.user.create({
        data:{
            name, email, passwordHash:hashedpassword
        }
    }) 
    return {status:'success', data: user }
} catch (error) {
    console.log(error);
    return { status:'error', error:'smth is wrong'}
    
}


}

export async function getUserByEmail(email:string) {
    return prisma.user.findUnique(
        {where :{email}}
    );
    
}
export async function getUserById(id:string) {
    return prisma.user.findUnique(
        {where :{id}}
    );
    
}



export async function getAuthUserId() {
      const session  =await auth();
            const userId = session?.user?.id;
    
            if(!userId) throw new Error('Unauthorized');
        return userId
}