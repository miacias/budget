import express, { Express } from "express";
import cors from "cors";
import { db } from "./config/connect";
import { logger } from "./utils/chalk";
import { router } from "./routes";

const PORT: number = Number(process.env.PORT) || 5000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

db.once("open", () => {
  app.listen(PORT, () =>
    logger.server.start(PORT)
  );
});

db.on("error", (err) => {
  logger.server.error(`DB Connection Error: ${err.message}`);
});

export { app };