
# Shopping Mall API

This is a basic REST API for managing products in a shopping mall. It uses NestJS, Prisma, PostgreSQL, and Docker.

## Features

- CRUD operations for products
- Products are associated with categories
- Automatically generate unique SKU for each product
- Pre-populated categories on startup
- API documentation with Swagger

## Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kamomkoyan2/shoping-mall-api
cd shopping-mall-api
```

### 2. Set up environment variables

Create a `.env` file in the root of the project and add the following:

```env
PORT=3000
DATABASE_URL="postgresql://nest:secret@postgres:5432/postgres?schema=public"
```

### 3. Build and run the application with Docker

Make sure Docker is running, then execute:

```bash
docker-compose up --build
```

This command will:
- Build the Docker images
- Run the PostgreSQL database
- Run the NestJS application

### 4. Apply Prisma migrations

Open a new terminal and run the following command to apply the Prisma migrations:

```bash
docker-compose exec app npx prisma migrate dev --name init
```

This command will:
- Generate Prisma client
- Apply migrations to the PostgreSQL database

### 5. Access the API

Once the application is running, you can access the API at:

```
http://localhost:3000/api
```

### 6. Access Swagger Documentation

API documentation is available at:

```
http://localhost:3000/api/docs
```

## Endpoints

- **GET /api/products**: Get a list of all products
- **GET /api/products/:id**: Get details of a specific product by ID
- **POST /api/products**: Create a new product
- **PATCH /api/products/:id**: Update an existing product
- **DELETE /api/products/:id**: Delete a product

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
