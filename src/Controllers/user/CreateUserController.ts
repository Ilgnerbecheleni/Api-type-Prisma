import { Request,Response } from "express";
import { CreateUserService } from "../../Services/User/CreateUserService";
import { UserRequest } from "../../models/interfaces/user/UserRequest";

class CreateUserController {

    async handle(request:Request , response : Response) {
        const {name,email,password} = request.body;

        const createUserservice = new CreateUserService();

        const user = await createUserservice.execute({name,email,password});

        return response.json(user);


    }



}

export {CreateUserController}