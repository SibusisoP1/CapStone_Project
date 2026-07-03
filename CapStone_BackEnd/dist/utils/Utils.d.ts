import Multer from "multer";
export declare class Utils {
    multer: Multer.Multer;
    static jwtSign(payload: any): string;
    static jwtVerify(token: string): Promise<any>;
}
