interface ILogin {
  user: string;
  password: string;
  roles?: string[];
}

export function login(credenciales: ILogin): boolean {
  const { user, password } = credenciales;
  let userResponse: ILogin;
  if (user === 'admin' && password === 'admin') {

    userResponse = {
      ...credenciales,
      roles: ['admin', "user"]
    }

  } else if (user === 'usuario' && password === 'usuario') {
    userResponse = {
      ...credenciales,
      roles: ['user']
    }

  } else {
    return false;
  }
  const datosUsuario = JSON.stringify(userResponse);
  localStorage.setItem('user', datosUsuario);
  return true
}

export const logout = () => localStorage.removeItem('user');
export const isAuth = () => localStorage.getItem('user') ? true : false;

export const userHasRole = (roles: string[]) => {
  const user = localStorage.getItem('user');
  if (user) {
    const userResponse: ILogin = JSON.parse(user);
    return roles.some(role => userResponse.roles?.includes(role));
  }
  return false;
}