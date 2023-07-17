# Imagen base para el backend de Flask
FROM python:3.11.2-slim AS backend

# Establecer el directorio de trabajo para el backend
WORKDIR /app/backend

# Copiar los archivos de la API de Flask al contenedor
COPY ./api /app/backend/api

# Instalar las dependencias del backend
RUN pip install --no-cache-dir -r ./api/requirements.txt

# Establecer la variable de entorno FLASK_APP
ENV FLASK_APP=api.app

# Exponer el puerto 5000 para el servidor Flask
EXPOSE 5000

# Iniciar el servidor Flask
CMD ["flask", "run", "--host=0.0.0.0"]