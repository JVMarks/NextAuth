import { setCookie as setCookieNookies } from "nookies";

export function setCookie( type: string ,name: string, value: string) {
  setCookieNookies( type, name, value, {
    maxAge: 60 * 60 * 25 * 30, // 30 days
    path: "/",
  });
}
