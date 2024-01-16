<<<<<<< HEAD
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";
import { parseCookies } from "nookies";
=======
// canSSRGuest.ts

import { parseCookies } from "cookies";
>>>>>>> 5658565b35c8723380facda283f6f791b77933e6

//funcao para paginas que só pode ser acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    // Se o cara tentar acessar a pagina porem tendo já um login salvo redirecionamos
    if (cookies["@nextauth.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    console.log("teste2");
    return await fn(ctx);
  };
}
