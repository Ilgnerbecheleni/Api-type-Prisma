import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { AuthRequest } from "../../models/interfaces/user/auth/AuthRequest";

class AuthUserservice{

async execute({email,password}:AuthRequest){

    //verificar no banco se existe o usuario
    if(!email){
        throw new Error("email não pode ser nulo");
    }

    if(!password){
        throw new Error("password não pode ser nulo");
    }


//verifica se o usuario existe
    const user = await prismaClient.user.findFirst({
        where: {
        email: email
        }
    });

if(!user){
    throw new Error ("wrong email or password");
}
//verificar a senha correta ,
const passwordmatch = await compare(password,user.password);

if(!passwordmatch){
    throw new Error ("wrong password");
}

const token = sign({
    name:user?.name ,
    email:user?.email,
    },
    process.env.JWT_SECRET as string,{
        subject:user?.id,
        expiresIn:"1h"
    } )

    return {
        id:user?.id,
        nome:user?.name,
        email:user?.email,
        token:token
    }


}


}

export {AuthUserservice}
