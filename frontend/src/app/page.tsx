"use client";
import Image from "next/image";
import { FormEvent, useContext, useState } from "react";
import logoImg from "../../public/logo.svg";
import styles from "../../styles/home.module.scss";

import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";

import { AuthContext } from "../contexts/AuthContext";

import Link from "next/link";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("PREENCHA OS DADOS");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
    };

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Acesse sua conta</h1>

          <form onSubmit={handleLogin}>
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
              Acessar
            </Button>
          </form>

          <Link className={styles.text} href="/signup">
            Não possui uma conta? <strong>Cadastre-se</strong>
          </Link>
        </div>
      </div>
    </>
  );
}
