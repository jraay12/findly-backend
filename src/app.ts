import express from "express";
const swaggerUi = require('swagger-ui-express'); 
const swaggerJsdoc = require('swagger-jsdoc'); 

import userRoutes from "./interfaces/routes/user.routes";

const app = express();
app.use(express.json());

// ----------------------
// Swagger configuration
// ----------------------
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API for managing users",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {      // ← This is required for padlock
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [], // optional global security
  },
  apis: ["./src/interfaces/routes/*.ts"], // your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ----------------------
// Register your routes
// ----------------------
app.use("/users", userRoutes);

export default app;
