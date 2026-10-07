# WebApp API - Proyecto CI/CD

## Descripción

WebApp es una API REST desarrollada con Node.js, Express, Sequelize y SQLite.

El proyecto implementa endpoints para administrar productos y categorías.

## Tecnologías

- Node.js
- Express
- Sequelize
- SQLite
- Jest
- Supertest
- Docker
- Docker Hub
- GitHub Actions
- AWS EC2

## Endpoints

### Productos

GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

### Categorías

GET /api/categories
GET /api/categories/:id
POST /api/categories
PUT /api/categories/:id
DELETE /api/categories/:id

## Instalación local

Instalar dependencias:

npm install

Ejecutar la aplicación:

npm start

## Pruebas

Ejecutar pruebas:

npm test

Ejecutar pruebas con cobertura:

npm run test:coverage

## Docker

Construir la imagen:

docker build -t webapp .

Ejecutar el contenedor:

docker run -d -p 8080:80 -p 6061:6061 --name webapp-container webapp

## CI/CD

El proyecto utiliza GitHub Actions para automatizar:

1. Instalación de dependencias.
2. Ejecución de pruebas.
3. Generación de cobertura.
4. Construcción de imagen Docker.
5. Publicación en Docker Hub.
6. Despliegue automático en AWS EC2.

## Infraestructura

La aplicación se despliega en una instancia AWS EC2 con Ubuntu Server y Docker.