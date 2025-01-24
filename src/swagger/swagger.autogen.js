  import swaggerAutogen from "swagger-autogen";
  import { developerValidationSchema } from "../validation/developerValidation.js";
  import joiToSwagger from "joi-to-swagger";
import { DOC_CATEGORIES } from "../utils/constant.js";

  // Convert the Joi schema to a Swagger schema
  const { swagger: developerSchemaSwagger } = joiToSwagger(
    developerValidationSchema
  );

  const options = {
    openapi: "OpenAPI 3", // Ensure OpenAPI 3.0 specification
    language: "en-US", // Language for responses
    disableLogs: true,
    autoHeaders: true,
    autoQuery: true,
    autoBody: true, // Write the output to the file
  };

  const doc = {
    info: {
      title: "API Documentation",
      description: "API documentation for the application.",
      version: "1.0.0",
    },
    host: ["localhost:3031"],
    basePath: "/api",
    schemes: ["http", "https"],
    consumes: ["application/json", "multipart/form-data"],
    produces: ["application/json"],
    servers: [
      {
        url: "http://localhost:3101",
        description: "Local base url",
      },
      {
        url: "http://192.168.1.180:3101",
        description: "Live base url",
      },
    ],
    tags: [
      {
        name: "Company",
        description: "APIs for managing companies",
      },
      {
        name: "Developer",
        description: "APIs for managing developers",
      },
    ],
    securityDefinitions: {},
    components: {
      schemas: {
        developerSchema: developerSchemaSwagger,
        developerDoc:{
          type: "object",
          properties: {
            message: { type: "object", example: DOC_CATEGORIES },
          },
        },
        errorResponse400: {
          type: "object",
          properties: {
            code: { type: "integer", example: 400 },
            message: { type: "string", example: "Invalid request parameters." },
          },
        },
        errorResponse500: {
          type: "object",
          properties: {
            code: { type: "integer", example: 500 },
            message: { type: "string", example: "Internal server error." },
          },
        },
      },
    },
    paths: {
      "developer/": {
        post: {
          tags: ["Developer"],
          consumes: ["multipart/form-data"],
          summary: "Create a new developer",
          description:
            "This API endpoint creates a new developer with a file upload.",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    file: {
                      type: "string",
                      format: "binary",
                      description: "The file to upload",
                    },
                    description: {
                      type: "string",
                      description: "Description of the file",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Developer added successfully.",
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Developer created successfully.",
                  },
                  data: { $ref: "#/components/schemas/developerSchema" },
                },
              },
            },
            400: {
              description: "Invalid input data.",
              schema: { $ref: "#/components/schemas/errorResponse400" },
            },
            500: {
              description: "Internal server error.",
              schema: { $ref: "#/components/schemas/errorResponse500" },
            },
          },
        },
      },
    },
  };

  const outputFile = "./src/swagger/swagger-output.json"; // Path to save Swagger file
  const endpointsFiles = ["./src/routes/index.routes.js"]; // Path to your root route file

  // Generate Swagger documentation
  swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(() => {
    console.log("Swagger documentation generated successfully!");
  });
