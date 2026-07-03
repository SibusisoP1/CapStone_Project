export declare class GlobalMiddleWare {
    static checkError(req: any, res: any, next: any): any;
    private static getToken;
    static auth(req: any, res: any, next: any): Promise<any>;
    static adminRole(req: any, res: any, next: any): any;
}
