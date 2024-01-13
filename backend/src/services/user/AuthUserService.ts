import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";

// Quando alguém chamar o execute eu quero que ele passe 2 parâmetros do tipo string
interface AuthRequest {
  email: String;
  password: String;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o e-mail existe:
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    // Verificar se a senha está correta
    const passwordMath = await compare(password, user.password);

    if (!passwordMath) {
      throw new Error("User/password incorrect");
    }

    // Se deu tudo certo vamos gerar um token JWT e devolver os dados do usuário como id, name e email
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
