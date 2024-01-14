import Image from "next/image";
import logoImg from "../../public/logo.svg";
import styles from "../../styles/home.module.scss";

import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Acesse sua conta</h1>

          <form>
            <Input placeholder="Digite seu e-mail" type="text" />

            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={false}>
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
