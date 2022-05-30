import {Container} from "app/providers/AppContainer";
import storages from "../../fs";

export function upload(uploadName: string, fileName: Array<string | number> | string) {

    try {
        if (!storages[uploadName]) throw new Error(`${uploadName} file upload  not found !`)

        if (typeof fileName === 'string') {
            return storages[uploadName].single(fileName)
        } else {
            if (typeof fileName[1] === 'number') {
                return storages[uploadName].array(fileName[0], fileName[1])
            } else {
                let uploads: Array<object> = []
                for (let i = 0; i < fileName.length; i++) {
                    uploads.push({
                        name: fileName[i], maxCount: 1
                    })
                }
                return storages[uploadName].fields(uploads)
            }
        }
    } catch (e: any) {
        throw new Error(e)
    }
}

export function controller(controller: any, method: string, view: string = 'home') {
    let ctl = new controller()
    ctl.agentView = view
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
    let middlewareCls = Container._middlewares.find((_middleware: any) => _middleware._name === middleware)
    if (middlewareCls) {
        middlewareCls.hasParams ? middlewareCls = new middlewareCls(parameters) : middlewareCls = new middlewareCls()
        return middlewareCls.run
    }
    throw new Error(`middleware dos not exists!`)
}

