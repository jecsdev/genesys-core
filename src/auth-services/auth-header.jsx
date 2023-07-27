import Cookies from 'js-cookie';

export default function authHeader() {
  const userCookie = Cookies.get('user');

  if (userCookie) {
    const user = JSON.parse(userCookie);
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    }
  }

  return {};
}
