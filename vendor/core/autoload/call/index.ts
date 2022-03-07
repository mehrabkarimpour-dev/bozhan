import registerMiddleware, {middlewareNotFound} from "../../../../app/http/middleware";


export function controller(controller: any, method: string) {
    let ctl = new controller()
    return ctl[method];
}

export function validate(validation: any) {
    let validationObg = new validation()
    return validationObg.validate()
}

export function handleErrors(validation: any) {
    let validationObg = new validation()
    return validationObg['handle']
}

export function middleware(middleware: string, parameters: any = null) {
    let middlewareCls = registerMiddleware.find((_middleware: any) => _middleware._name === middleware)
    if (middlewareCls) {
        middlewareCls.hasParams ? middlewareCls = new middlewareCls(parameters) : middlewareCls = new middlewareCls()
        return middlewareCls.run
    }
    return middlewareNotFound
}

