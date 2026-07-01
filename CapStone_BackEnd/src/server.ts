import express, { Application } from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { getEnviromentVariables } from "./enviroments/enviroment";
import UserRouter from "./routers/UserRouter";

export class Server {
  public app: Application = express();

  constructor() {
    this.setConfigs();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigs() {
    this.connectMongoDB();
    this.configureBodyParser();
  }

  configureBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  connectMongoDB() {
    mongoose.connect(getEnviromentVariables().db_uri).then(() => {
      console.log("Connected to MongoDb");
    });
  }

  setRoutes() {
    this.app.use("/api/user", UserRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({ message: "Route not found", status_code: 404 });
    });
  }

  handleErrors() {
    this.app.use((error: Error, req: any, res: any, next: any) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "something",
        status_code: errorStatus,
      });
    });
  }
}
