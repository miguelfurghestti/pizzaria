"use client";
import { FormEvent, useContext, useState } from "react";

import Image from "next/image";
import logoImg from "../../../public/logo.svg";
import styles from "../../../styles/home.module.scss";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

import Link from "next/link";

import { AuthContext } from "../../contexts/AuthContext";

import { toast } from "react-toastify";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  //async é usado quando o procedimento que será chamdo pode demorar um pouco.
  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === "" || email === "" || password === "") {
      toast.error("Erro ao cadastrar.");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password,
    };

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando a sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Digite seu e-mail"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>

          <Link className={styles.text} href="/">
            Já possuo uma conta. <strong>Entrar</strong>
          </Link>
        </div>
      </div>
    </>
  );
}
