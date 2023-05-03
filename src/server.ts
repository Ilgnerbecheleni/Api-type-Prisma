import express, {Request, Response , NextFunction} from 'express';
import "express-async-errors";

import { router } from './Routes';

const app = express();
const port = 3333;
app.use(express.json());  // aceitamos arquivos json

app.use(router);
app.use((err:Error,request:Request,response:Response,next:NextFunction)=>{
    if(err instanceof Error){
        return response.status(400).json({error: err.message});
    }else{
        return response.status(500).json({status:'error',message:'internal server error'});
    }
})

app.listen(port,()=>{
    console.log('Servidor iniciado em: '+ port);
})


