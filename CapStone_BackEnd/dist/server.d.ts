import { Application } from "express";
export declare class Server {
    app: Application;
    constructor();
    setConfigs(): void;
    configureBodyParser(): void;
    allowCors(): void;
    connectMongoDB(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleErrors(): void;
}
