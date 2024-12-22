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

## Licencia

Este proyecto está licenciado bajo la Licencia MIT.