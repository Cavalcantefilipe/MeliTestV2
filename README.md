# MeliTest V2 - E-commerce API

An e-commerce API built with Clean Architecture principles, TypeScript, and Express.js. The API provides endpoints for managing categories, sellers, and products with comprehensive validation rules and Swagger documentation.

## Features

- **Clean Architecture**: Separation of concerns with Domain, Application, and Infrastructure layers
- **Comprehensive Validations**: 
  - Products must be linked to existing categories and sellers
  - Unique seller emails with format validation
  - Unique category names
  - Required fields validation (name, price for products, etc.)
  - ID immutability (cannot be updated)
- **Swagger Documentation**: Interactive API documentation available at `/api-docs`
- **JSON File Storage**: Uses JSON files for data persistence
- **TypeScript**: Full TypeScript implementation with strict typing
- **Unit Tests**: Comprehensive test coverage with Jest

## Project Structure

```
src/
├── domain/                 # Domain layer (business logic)
│   ├── entities/          # Domain entities
│   │   ├── Category.ts
│   │   ├── Product.ts
│   │   └── Seller.ts
│   ├── CategoryRepository.ts
│   ├── ProductRepository.ts
│   └── SellerRepository.ts
├── application/           # Application layer (use cases)
│   └── usecases/
│       ├── CreateCategory.ts
│       ├── GetCategories.ts
│       ├── CreateSeller.ts
│       ├── GetSellers.ts
│       ├── CreateProduct.ts
│       └── GetProducts.ts
├── infra/                # Infrastructure layer
│   ├── http/             # HTTP server implementation
│   ├── controller/       # API controllers
│   ├── repository/       # Repository implementations
│   └── di/              # Dependency injection
└── main.ts              # Application entry point

database/                # JSON data files
├── category.json
├── product.json
└── seeler.json
```

## API Endpoints

### Categories
- `GET /categories` - List all categories
- `POST /categories` - Create a new category

### Sellers
- `GET /sellers` - List all sellers  
- `POST /sellers` - Create a new seller

### Products
- `GET /products` - List all products (with optional filters)
- `POST /products` - Create a new product

## Validation Rules

### Categories
- Name is required and must be unique
- Name cannot exceed 100 characters

### Sellers
- Name is required and cannot exceed 100 characters
- Email is required, must be valid format, and must be unique
- Phone is optional
- Sales count cannot be negative

### Products
- Name is required and cannot exceed 200 characters
- Price is required and cannot be negative
- CategoryId is required and must reference an existing category
- SellerId is required and must reference an existing seller
- Quantity cannot be negative
- Rating must be between 0 and 5 (if provided)
- IDs cannot be updated once created

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd MeliTestV2
```

2. Install dependencies
```bash
npm install
```

3. Build the project
```bash
npm run build
```

4. Run the development server
```bash
npm run dev
```

The server will start on port 3000. Visit `http://localhost:3000/api-docs` to view the Swagger documentation.

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run the compiled application
- `npm run dev` - Run in development mode with hot reload
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode

## Usage Examples

### Create a Category
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Electronics"}' \
  http://localhost:3000/categories
```

### Create a Seller
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Tech Store","email":"contact@techstore.com","phone":"+5511999999999"}' \
  http://localhost:3000/sellers
```

### Create a Product
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{
    "name":"Smartphone",
    "price":599.99,
    "categoryId":"<category-id>",
    "sellerId":"<seller-id>",
    "description":"Latest smartphone model",
    "quantity":50
  }' \
  http://localhost:3000/products
```

### Get Products by Category
```bash
curl "http://localhost:3000/products?categoryId=<category-id>"
```

### Get Products by Seller
```bash
curl "http://localhost:3000/products?sellerId=<seller-id>"
```

## Testing

The project includes comprehensive unit tests for domain entities. Run tests with:

```bash
npm test
```

Tests cover:
- Entity validation rules
- Business logic
- Error handling
- Edge cases

## Architecture

This project follows Clean Architecture principles:

- **Domain Layer**: Contains business entities and repository interfaces
- **Application Layer**: Contains use cases that orchestrate domain entities
- **Infrastructure Layer**: Contains technical implementations (HTTP server, file storage, dependency injection)

## Technology Stack

- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **Express.js** - Web framework
- **Swagger** - API documentation
- **Jest** - Testing framework
- **JSON Files** - Data storage

## License

MIT License