import { Request, Response } from "express";
import { AuthUserservice } from "../../Services/User/AuthUserService";
import { AuthRequest } from "../../models/interfaces/user/auth/AuthRequest";

export class AuthUserController {
  async handle(request: Request, response: Response) {
    const { email, password }: AuthRequest = request.body;
    const authUserService = new AuthUserservice();
    const auth = await authUserService.execute({ email, password });

    return response.json(auth);
  }
}
