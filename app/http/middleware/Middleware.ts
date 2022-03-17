import {Request, Response} from "express";

class Middleware {
    /**
     * @param req
     * @param res
     * @author mehrab karimpour
     */
    public static needAuth(req: Request, res: Response) {
        //return res.status(403).send('لطفا ابندا وارد شوید')
        return res.status(403).send({
            status: false,
            message: 'لطفا ابتدا وارد شوید',
            data: null
        })
    }
}

export default Middleware