FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install nodemon --save-dev

# Copiar el resto de los archivos de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["npm", "run", "docker"]