# Product Inventory System

A **Product Inventory Management System** built with **Laravel 12 (REST API backend)** and **Vue 3 + Vuex (frontend)**.
This project demonstrates clean CRUD operations, image uploads, soft deletes, pagination, search, and centralized state management.

---

## Tech Stack

### Backend

* Laravel 12
* RESTful API
* MySQL / MariaDB
* Eloquent ORM
* Soft Deletes
* Laravel Storage (Image Upload)

### Frontend

* Vue 3
* Vuex (State Management)
* Axios (API Communication)
* Vue Router
* Tailwind CSS (optional / CDN)

---

## Core Features

* Product listing with pagination
* Search products by name
* Create products with image upload
* Update existing products
* Soft delete products (recoverable)
* Centralized state using Vuex
* API-driven architecture
* Image preview from Laravel storage

---

## Installation Guide

### 1. Backend Setup (Laravel 12)

Clone the backend repository:

```bash
git clone <backend-repo-url>
cd laravel-backend
```

Install PHP dependencies:

```bash
composer install
```

Create environment file:

```bash
cp .env.example .env
```

Configure database credentials in `.env`:

```env
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Generate application key:

```bash
php artisan key:generate
```

Run migrations and seeders:

```bash
php artisan migrate --seed
```

Create storage symlink (required for images):

```bash
php artisan storage:link
```

Start the Laravel server:

```bash
php artisan serve
```

Backend API base URL:

```
http://localhost:8000/api
```

---

### 2. Frontend Setup (Vue 3 + Vuex)

Navigate to the frontend directory:

```bash
cd frontend_products
```

Install Node dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run serve
```

Frontend URL:

```
http://localhost:8080
```

---

## API Endpoints

| Method | Endpoint             | Description                         |
| ------ | -------------------- | ----------------------------------- |
| GET    | `/api/products`      | List products (pagination & search) |
| GET    | `/api/products/{id}` | Get single product                  |
| POST   | `/api/products`      | Create new product                  |
| PUT    | `/api/products/{id}` | Update product                      |
| DELETE | `/api/products/{id}` | Soft delete product                 |

---

## Interview Questions & Answers

### 1. Dependency Injection vs Facade

**Dependency Injection** means passing required classes into a class or method. This keeps the code clean, flexible, and easy to test.

**Facades** provide a static-like interface to Laravel services. They are convenient but hide actual dependencies.

**Preferred Approach:**
I prefer **Dependency Injection** when writing business logic or large, testable applications.

---

### 2. Performance (Searching 10,000+ Products)

To handle large datasets efficiently:

* Add database indexes
* Use pagination
* Select only required columns
* Apply caching when necessary
* Use full-text search for advanced searching

This ensures fast queries and reduced database load.

---

### 3. Security (CSRF with Inertia.js)

Laravel automatically generates and validates a CSRF token for every request.

When using Inertia.js, Axios sends this token automatically with each request.

This protects the application from forged or malicious form submissions.

---

### 4. N+1 Query Problem

The N+1 query problem occurs when related data is loaded inside a loop, resulting in multiple database queries.

**Solution:** Use eager loading:

```php
Product::with('category')->paginate(15);
```

This significantly improves performance by reducing unnecessary queries.

---

## License

This project is open-source and intended for learning, assessment, and demonstration purposes.
