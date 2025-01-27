import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json" assert { type: "json" };
import { connectMongo } from "./config/dbConnection.js";
import routes from "./routes/index.routes.js";
import { globalErrorHandler } from "./utils/common.js";

const app = express();
const port = process.env.PORT ?? 3101;

// // CORS Middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// // Handle preflight requests
app.options("*", cors());

// ****************Swagger UI Start****************
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ****************Swagger UI End****************

// Body Parser Middleware

app.use(bodyParser.json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads"));
app.use(helmet());
// app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" })); // Set a reasonable limit
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// app.use(express.json());
// app.use(
//   bodyParser.urlencoded({
//     limit: "200mb",
//     extended: false,
//   })
// );
// app.use(
//   bodyParser.json({
//     limit: "200mb",
//   })
// );

// CORS error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      message: "Invalid JSON Data",
    });
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/download/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "uploads", fileName);
  res.download(filePath); // Triggers the download of the file
});

// API Routes
app.use("/api", routes);

app.use(globalErrorHandler);

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
