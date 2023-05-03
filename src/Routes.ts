import { Router,Request,Response } from "express";
import { CreateUserController } from "./Controllers/user/CreateUserController";
import { AuthUserController } from "./Controllers/user/AuthUserController";


const router = Router();

router.get("/",(req:Request , res:Response)=>{
    return res.json({ok:true});
})

//rotas usuario

router.post('/user',new CreateUserController().handle);
router.post('/session',new AuthUserController().handle);




export {router};