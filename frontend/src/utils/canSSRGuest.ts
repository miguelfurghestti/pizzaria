// canSSRGuest.ts

import { parseCookies } from "nookies";

export async function getData() {
  const res = await fetch("https://api.example.com/...");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function canSSRGuest(context: any) {
  const cookies = parseCookies(context);

  if (cookies["@nextauth.token"]) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const data = await getData();

  return data;
}
