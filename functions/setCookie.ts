export function setCookie(
  name: string,
  value: string,
  expirationInDays: number
): void {
  const date = new Date();
  date.setTime(date.getTime() + expirationInDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
}
