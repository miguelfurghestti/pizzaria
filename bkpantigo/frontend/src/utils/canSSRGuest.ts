import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function canSSRGuest() {
  const cookiesList = cookies();

  // const cookieStore = cookies();
  // Declare uma variável para armazenar o valor do cookie
  // let cookieValue = null;

  // Use forEach para iterar sobre os cookies e atribuir o valor à variável
  // cookieStore.getAll("@nextauth.token").forEach((cookie) => {
  //   cookieValue = cookie.value;
  // });
  const hasCookie = cookiesList.has("@nextauth.token");

  // console.log("cookies", cookies);
  // Agora você pode usar a variável como necessário

  if (hasCookie) {
    redirect("/dashboard");
  }
}
