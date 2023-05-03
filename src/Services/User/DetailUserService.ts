import prismaClient from "../../prisma";

export class UserDetailService {

async execute(user_id:string){

    if(user_id){
        const response = await prismaClient.user.findFirst({
            where:{id:user_id},
            select:{
                id:true,
                name:true,
                email:true,
            }
        })
    }

}


}