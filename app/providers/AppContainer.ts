import {LogEvent} from "../events/logEvent";
import {AuthMiddleware} from "../http/middleware/authMiddleware";
import loginRequest from "../http/requests/loginRequest";
import {RoleMiddleware} from "../http/middleware/roleMiddleware";
import {PermissionMiddleware} from "../http/middleware/permissionMiddleware";
import TestJob from "../schedule/TestJob";
import TestQueue from "../queue/testQueue";
import UploadImage from "../fs/uploadImage";
import testExport from "../export/testExport";
import testImport from "../import/TestImport";
import {userAgentMiddleware} from "../http/middleware/userAgentMiddleware";

/**
 * Bozhan container namespace
 */
export namespace Container {
    /**
     * events
     */
    export const _events: Array<object> = [
        LogEvent
    ]
    /**
     * middlewares
     */
    export const _middlewares: Array<any> = [
        AuthMiddleware,
        loginRequest,
        RoleMiddleware,
        PermissionMiddleware,
        userAgentMiddleware
    ]
    /**
     * jobs
     */
    export const _jobs: Array<object> = [
        TestJob
    ]
    /**
     * queues
     */
    export const _queues: Array<object> = [
        TestQueue
    ]
    /**
     * commands
     */
    export const _commands: Array<object> = []
    /**
     * uploads
     */
    export const _uploads: Array<object> = [
        UploadImage
    ]
    /**
     * exports
     */
    export const _exports: Array<object> = [
        testExport
    ]
    /**
     * imports
     */
    export const _imports: Array<object> = [
        testImport
    ]

}


