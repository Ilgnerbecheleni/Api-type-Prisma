import { Request,Response´,NextFunction } from "express";
import { Payload } from "../models/interfaces/user/auth/payload";
import { verify } from "jsonwebtoken";



export function isAuthenticated(
    request:Request,
    response:Response,
    next:NextFunction
){
    //acessar token
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).end();
    }
const [token] = authToken.split(" ");

try {
    const {sub }:Payload=verify(token, process.env.JWT_TOKEN) as Payload ;
    request.user_id = sub ;
    return next();

}catch(error){
response.send(401).end();
}

}