

# Imagen base para el frontend de Next.js
FROM node:18-alpine AS frontend

# Establecer el directorio de trabajo para el frontend
WORKDIR /app/frontend

# Copiar los archivos del proyecto de Next.js al contenedor
COPY . /app/frontend

# Instalar las dependencias del frontend
RUN yarn install

# Construir la aplicación de Next.js
RUN yarn build

# Exponer el puerto 3000 para el servidor de desarrollo de Next.js
EXPOSE 3000

# Iniciar el servidor de desarrollo de Next.js
CMD ["yarn", "start"]

# docker run -p 3000:3000 --env-file=./.env newsletter-test-1:latest