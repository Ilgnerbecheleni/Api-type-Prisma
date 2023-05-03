import { UserRequest } from "../../models/interfaces/user/UserRequest";
import prismaClient from "../../prisma";

import {hash} from 'bcryptjs'

class CreateUserService{

async execute ({name,email,password}:UserRequest){
if(!email){
    throw new Error("Email is required");
}

const userAleardExists = await prismaClient.user.findFirst({
    where:{
        email:email,
    }
})

if(userAleardExists){
    throw new Error("user already exists");
}

//encriptando a senha
const passwordhash:string  = await hash(password,8);


//criando usuario
const user = prismaClient.user.create({
    data:{
name:name,
email:email,
password:passwordhash,
},
select:{
    id:true,
    name:true,
    email:true,
}
})

return user ;


}

}

export {CreateUserService}