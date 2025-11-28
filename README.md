# Product API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

A robust and lightweight RESTful API designed for managing products and users. This project demonstrates a clean architecture using Node.js and Express, featuring secure authentication with JWT and role-based access control (RBAC).

## 🚀 Features

- **User Management**: Secure user registration and login functionality.
- **Product Management**: Full CRUD (Create, Read, Update, Delete) operations for products.
- **Authentication**: Stateless authentication using JSON Web Tokens (JWT).
- **Authorization**: Role-based access control ensuring only admins can perform sensitive operations (Create, Update, Delete products).
- **Validation**: Request data validation using `express-validator`.
- **Error Handling**: Centralized error handling mechanism.
- **In-Memory Database**: Uses a simple in-memory data structure for quick setup and testing (easily replaceable with a persistent DB).

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Authentication**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Validation**: [express-validator](https://express-validator.github.io/docs/)
- **Logging**: [morgan](https://github.com/expressjs/morgan)
- **Environment Management**: [dotenv](https://github.com/motdotla/dotenv)

## 📋 Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 🔧 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd product-api
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    JWT_SECRET=your_super_secret_key
    ```

4.  **Start the server**
    - For development (with hot-reload):
      ```bash
      npm run dev
      ```
    - For production:
      ```bash
      npm start
      ```

## 📡 API Endpoints

### User Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/register` | Register a new user | Public |
| `POST` | `/api/users/login` | Authenticate user & get token | Public |

### Product Routes

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products | Authenticated |
| `GET` | `/api/products/:id` | Get a single product by ID | Authenticated |
| `POST` | `/api/products` | Create a new product | Admin |
| `PUT` | `/api/products/:id` | Update an existing product | Admin |
| `DELETE` | `/api/products/:id` | Delete a product | Admin |

**Note:** For authenticated routes, you must include the JWT token in the `Authorization` header:
```http
Authorization: Bearer <your_token>
```

## 📂 Project Structure

```
product-api/
├── src/
│   ├── controllers/      # Request handlers
│   ├── database/         # Data storage (In-memory)
│   ├── middleware/       # Auth, logging, error handling
│   ├── models/           # Data models
│   ├── routes/           # API route definitions
│   ├── app.js            # Express app setup
│   └── server.js         # Entry point
├── .env                  # Environment variables
├── package.json          # Project metadata & scripts
└── README.md             # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed to Dofiie
