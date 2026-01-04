// accessToken 만료 확인
export function isTokenExpired(token?: string | null): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
}

// 로그인상태 체크
export function isLoggedIn(userName: string | null | undefined): boolean {
  if (!userName) return false;
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  if (!accessToken || isTokenExpired(accessToken)) return false;
  return true;
}
