import express from "express";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger-output.json" assert { type: "json" };

const app = express();
import cors from "cors";
import bodyParser from "body-parser";
const port = process.env.PORT ?? 3101;
import { connectMongo } from "./config/dbConnection.js";
import routes from "./routes/index.routes.js";

// ****************Swagger UI Start****************
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

// ****************Swagger UI End****************

app.use(
  cors({
    origin: "*",
  })
);

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

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.badRequest({
      message: "Invalid JSON Data",
    });
  }
  next();
});

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
