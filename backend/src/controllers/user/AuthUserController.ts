import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    // Nunca esquecer de usar o await para esperar o serviço devolver a resposta pra depois prosseguir, só depois de devolver a resposta que ele vai definir o auth.
    const auth = await authUserService.execute({
      email,
      password,
    });

    return res.json(auth);
  }
}

export { AuthUserController };
