import express, {NextFunction, Request, request, Response, response} from 'express';


declare global {
    namespace Express {
        interface Request {
            auth: object | null | Array<object>
        }
    }
}

declare global {
    namespace P {
        interface BaseLogger {
            error: any
        }
    }
}

const declares = (app: any) => {
    return app.use((req: Request, res: Response, next: NextFunction) => {
        req.auth = null
        next();
    });
}

export default declares
