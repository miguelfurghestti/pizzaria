"use client";
import { createContext, ReactNode, useState } from "react";
import { api } from "../services/apiClient";

import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";

import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  const router = useRouter();
  try {
    destroyCookie(undefined, "@nextauth.token");
    router.push("/");
  } catch {
    console.log("Erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;
  const router = useRouter();

  //-- SIGN IN - LOGAR
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      // console.log(response.data);
      const { id, name, token } = response.data;
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
        path: "/", // Quais caminhos terão acesso ao cookie, deixando "/" serão todos.
      });

      setUser({
        id,
        name,
        email,
      });

      // Passar para as próximas requisições o nosso token
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // Redirecionar o user para /dashboard
      //console.log("deucerto");
      toast.success("Logado com sucesso!");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Falha ao logar!");
      console.log("ERRO AO ACESSAR ", err);
    }
  }

  //-- SIGN UP - CADASTRAR

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso!");
      router.push("/");
    } catch (err) {
      toast.error("Erro ao cadastrar!");
      // console.log("Erro ao cadastrar ", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
