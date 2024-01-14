import Image from "next/image";
import logoImg from "../../../public/logo.svg";
import styles from "../../../styles/home.module.scss";

import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando a sua conta</h1>
          <form>
            <Input placeholder="Digite seu nome" type="text" />

            <Input placeholder="Digite seu e-mail" type="text" />

            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={false}>
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
