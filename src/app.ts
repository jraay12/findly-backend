import express from "express";
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
import cors from "cors"; // ← import CORS

import userRoutes from "./interfaces/routes/user.routes";
import itemRoutes from "./interfaces/routes/item.routes";
import path from "path";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you need cookies
  })
);

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
        bearerAuth: {
          // ← This is required for padlock
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

const rootPath = path.resolve(__dirname, ".."); // __dirname is src/, so .. is project root

app.use("/findly-upload", express.static(path.join(rootPath, "findly-upload")));

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ----------------------
// Register your routes
// ----------------------
app.use("/users", userRoutes);
app.use("/items", itemRoutes);

export default app;
