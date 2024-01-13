import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receber o Token
  const authToken = req.headers.authorization;

  // Se não enviou nenhum Token já vai ser barrado o acesso sem nem verificar.
  if (!authToken) {
    return res.status(401).end();
  }

  // Criar uma array com 2 itens sendo que o primeiro não será definido e o segundo terá o nome de token, porque o split é igual ao explode onde usará o espaço em branco pra dividir um array.

  const [, token] = authToken.split(" ");

  try {
    //validar esse token
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    //Recuperar o id do token e colocar dentro de uma variável user_id dentro do req.
    req.user_id = sub;

    return next();
    // console.log(sub);
  } catch (err) {
    return res.status(401).end();
  }

  // console.log(token);
}
