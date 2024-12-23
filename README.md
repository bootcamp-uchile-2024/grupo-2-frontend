# Cervezario - Grupo 2 Frontend

Este proyecto es la parte frontend de la aplicación Cervezario desarrollada por el Grupo 2. Está construida con React y proporciona una interfaz de usuario para la administración de usuarios y otras funcionalidades relacionadas con la gestión de cervezas.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación en Entorno de Desarrollo

1. Clona el repositorio en tu máquina local:
    ```bash
    git clone https://github.com/bootcamp-uchile-2024/grupo-2-frontend
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd cervezario-frontend
    ```

3. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

4. Crea un archivo [.env](http://_vscodecontentref_/0) en la raíz del proyecto y configura las variables de entorno necesarias. Un ejemplo de archivo [.env](http://_vscodecontentref_/1) podría ser:
    ```env
    # FRONTEND
    VITE_SERVER_API = http://localhost:4500
    
    # BACKEND
    APP_NAME = Cervezario Nacional
    APP_VERSION = 1.0.1
    NESTJS_PORT = 4500
    AMBIENTE = Develop
    NODE_VERSION = 22.9.0-alpine3.19

    DB_HOST=db
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=clave123
    DB_NAME=Cervezario
    ```

5. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

6. Abre tu navegador y navega a `http://localhost:5173` para ver la aplicación en funcionamiento. 

## Compilación e Instalación en Producción

1. Asegúrate de tener configuradas las variables de entorno adecuadas en un archivo [.env](http://_vscodecontentref_/2) para el entorno de producción. Un ejemplo de archivo [.env](http://_vscodecontentref_/3) para producción podría ser:
    ```env
    REACT_APP_API_URL=https://api.tu-dominio.com
    REACT_APP_ENV=production
    REACT_APP_FEATURE_FLAG=false
    ```

2. Compila la aplicación para producción:
    ```bash
    npm run build
    ```

3. Los archivos compilados se encontrarán en el directorio `build`. Puedes servir estos archivos estáticos utilizando un servidor web como Nginx, Apache o cualquier servicio de hosting estático.

4. Configura tu servidor web para servir los archivos del directorio `build`. Un ejemplo de configuración para Nginx podría ser:
    ```nginx
    server {
        listen 80;
        server_name tu-dominio.com;

        location / {
            root /ruta/a/tu/proyecto/build;
            try_files $uri /index.html;
        }
    }
    ```

5. Reinicia tu servidor web para aplicar los cambios.

¡Y eso es todo! Ahora tu aplicación debería estar corriendo en producción.

## Despligue docker
1. Para poder crear una imagen latest del frontend se tiene que ejecutar el siguiente comando:
   ```
npm run push-latest-prod
   ```
El cual tiene un prehook que permite buildear la imagen antes de ser enviada a docker hub
2. Para poder desarrollar se pueden utilizar los siguientes comandos para construir, iniciar y terminar los servicios del stack de tecnologicas:
```
make build-development
make start-development
make stop-development
```
Para que funcione adecuadamente lo anterior se tiene que configurar el archivo .env.dev que esta en la raiz del proyecto y en env.example son las variables necesarias para que funcione.
La principal caracteristica de este docker compose es que el codigo es compilado en tiempo real para poder ver los cambios inmediatamente
3. Para produccion se pueden utilizar los siguientes comandos también:
```
make build-production
make start-production
make stop-production
```
Para que funcione adecuadamente lo anterior se tiene que configurar el archivo .env.prod que esta en la raiz del proyecto y en env.example son las variables necesarias para que funcione.
La principal caracteristica de este docker compose es que las imagenes son traidas desde docker hub, ya compiladas

4. Por ultimo, la aplicación en estos momentos esta funcionando en http://18.221.105.249/ en un EC2
## Licencia

Este proyecto está licenciado bajo la Licencia MIT.
