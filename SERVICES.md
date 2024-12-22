# Endpoints del Proyecto Cervezario

## Cervezas
- **Obtener cervezas**
  - Método: `GET`
  - Endpoint: `${CERVEZAS_ENDPOINT}`
  - Descripción: Obtiene una lista de todas las cervezas disponibles.
  - http://localhost:4500/cervezas?pagina=1&cantproductos=10

- **Obtener detalles de una cerveza**
  - Método: `GET`
  - Endpoint: `${CERVEZAS_ENDPOINT}/{id}`
  - Descripción: Obtiene los detalles de una cerveza específica por su ID.
  - http://localhost:4500/cervezas/1

- **Crear cerveza**
  - Método: `POST`
  - Endpoint: `${CERVEZAS_ENDPOINT}`
  - Descripción: Crea una nueva cerveza.
  - http://localhost:4500/cervezas/

- **Actualizar estado de una cerveza**
  - Método: `PATCH`
  - Endpoint: `${CERVEZAS_ENDPOINT}/{id}/actualizarestado`
  - Descripción: Actualiza el estado (activo/inactivo) de una cerveza específica por su ID.
  - http://localhost:4500/cervezas/1

- **Cargar imagen de una cerveza**
  - Método: `POST`
  - Endpoint: `${CERVEZAS_ENDPOINT}/{id}/cargarimagen`
  - Descripción: Carga una imagen para una cerveza específica por su ID.
  - http://localhost:4500/cervezas/1/cargarimagen

- **Actualizar imagen de una cerveza**
  - Método: `POST`
  - Endpoint: `${CERVEZAS_ENDPOINT}/{id}/actualizarimagen`
  - Descripción: Actualiza la imagen de una cerveza específica por su ID.
  - http://localhost:4500/cervezas/1/actualizarimagen


## Usuarios
- **Obtener usuarios**
  - Método: `GET`
  - Endpoint: `${USERS_ENDPOINT}`
  - Descripción: Obtiene una lista de todos los usuarios.
  - http://localhost:4500/usuarios

- **Obtener detalles de un usuario**
  - Método: `GET`
  - Endpoint: `${USERS_ENDPOINT}/{rut}`
  - Descripción: Obtiene los detalles de un usuario específico por su RUT.
  - http://localhost:4500/usuarios/12345678-9

- **Crear usuario**
  - Método: `POST`
  - Endpoint: `${USERS_ENDPOINT}`
  - Descripción: Crea un nuevo usuario.
  - http://localhost:4500/usuarios/

- **Actualizar estado de un usuario**
  - Método: `PATCH`
  - Endpoint: `${USERS_ENDPOINT}/{rut}/estado`
  - Descripción: Actualiza el estado (activo/inactivo) de un usuario específico por su RUT.
  - http://localhost:4500/usuarios/12345678-9/estado

- **Iniciar sesión**
  - Método: `POST`
  - Endpoint: `${LOGIN_ENDPOINT}`
  - Descripción: Inicia sesión para un usuario.
  - http://localhost:4500/usuarios/login

## Amargor
- **Obtener niveles de amargor**
  - Método: `GET`
  - Endpoint: `${AMARGOR_ENDPOINT}`
  - Descripción: Obtiene una lista de los niveles de amargor.
  - http://localhost:4500/Amargor

## Tipo de Cerveza
- **Obtener tipos de cerveza**
  - Método: `GET`
  - Endpoint: `${TIPO_ENDPOINT}`
  - Descripción: Obtiene una lista de los tipos de cerveza.
  - http://localhost:4500/Estilo