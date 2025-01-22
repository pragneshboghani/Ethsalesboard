import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json" assert { type: "json" };
import { connectMongo } from "./config/dbConnection.js";
import routes from "./routes/index.routes.js";

const app = express();
const port = process.env.PORT ?? 3101;

// CORS Middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// ****************Swagger UI Start****************
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/", (req, res) => {
//   res.json({
//     message: "Welcome to the API",
//   });
// });
// ****************Swagger UI End****************

// Body Parser Middleware
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: false,
  })
);
app.use(
  bodyParser.json({
    limit: "200mb",
  })
);

// CORS error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid JSON Data",
    });
  }
  next();
});

// API Routes
app.use("/api", routes);

async function initialize() {
  try {
    await connectMongo();
    app.listen(port, () => {
      console.log(`Listening on: ${port}`);
    });
  } catch (error) {
    console.error(
      `Unable to connect database: ${JSON.stringify(error.message)}`
    );
  }
}

initialize();
