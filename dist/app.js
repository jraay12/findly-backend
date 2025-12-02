"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors_1 = __importDefault(require("cors")); // ← import CORS
const user_routes_1 = __importDefault(require("./interfaces/routes/user.routes"));
const item_routes_1 = __importDefault(require("./interfaces/routes/item.routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", 'http://192.168.1.166:5173'],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // if you need cookies
}));
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
const rootPath = path_1.default.resolve(__dirname, ".."); // __dirname is src/, so .. is project root
app.use("/findly-upload", express_1.default.static(path_1.default.join(rootPath, "findly-upload")));
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// ----------------------
// Register your routes
// ----------------------
app.use("/users", user_routes_1.default);
app.use("/items", item_routes_1.default);
exports.default = app;
