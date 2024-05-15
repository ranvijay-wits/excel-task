import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from 'cors';
import dataRoute from "./routes/data";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors<Request>());

app.use(bodyParser.json());
app.use(dataRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
