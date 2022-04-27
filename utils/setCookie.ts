import { setCookie as setCookieNookies } from "nookies";

export function setCookie(name: string, value: string) {
  setCookieNookies(undefined, name, value, {
    maxAge: 60 * 60 * 25 * 30, // 30 days
    path: "/",
  });
}
