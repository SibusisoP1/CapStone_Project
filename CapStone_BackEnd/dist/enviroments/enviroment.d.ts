export interface Enviroment {
    db_uri: string;
    jwt_secret_key: string;
}
export declare function getEnviromentVariables(): {
    db_uri: string;
    jwt_secret_key: string;
};
