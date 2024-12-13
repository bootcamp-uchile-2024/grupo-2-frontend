interface ILogin {
  rut: string;
  contrasenia: string;
  rol?: string[];
}

export function login(credenciales: ILogin): boolean {
  const { rut, contrasenia } = credenciales;
  let userResponse: ILogin;
  if (rut === 'admin' && contrasenia === 'admin') {

    userResponse = {
      ...credenciales,
      rol: ['admin', "user"]
    }

  } else if (rut === 'usuario' && contrasenia === 'usuario') {
    userResponse = {
      ...credenciales,
      rol: ['user']
    }

  } else {
    return false;
  }
  const datosUsuario = JSON.stringify(userResponse);
  localStorage.setItem('user', datosUsuario);
  return true
}

export const isAdmin = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const userResponse: ILogin = JSON.parse(user);
    return userResponse.rol?.includes('admin');
  }
  return false;
}

export const userHasRole = (roles: string[]) => {
  const user = localStorage.getItem('user');
  if (user) {
    const userResponse: ILogin = JSON.parse(user);
    return roles.some(role => userResponse.rol?.includes(role));
  }
  return false;
}