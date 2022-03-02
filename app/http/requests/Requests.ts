import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";


export class RequestsForm {


    constructor() {

    }

    public static filterParamValid(array: any, validParams: any) {
        return Object.keys(array)
            .filter(key => validParams.includes(key))
            .reduce((obj: any, key) => {
                obj[key] = array[key];
                return obj;
            }, {});
    }


}