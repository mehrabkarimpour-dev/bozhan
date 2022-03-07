import {LogEvent} from "../events/logEvent";
import {AuthMiddleware} from "../http/middleware/authMiddleware";
import loginRequest from "../http/requests/loginRequest";
import {RoleMiddleware} from "../http/middleware/roleMiddleware";
import {PermissionMiddleware} from "../http/middleware/permissionMiddleware";
import TestJob from "../schedule/TestJob";
import TestQueue from "../queue/testQueue";
import TestCommand from "../console/command/testCommand";

export const _events: Array<object> = [
    LogEvent
]
export const _middlewares: Array<object> = [
    AuthMiddleware,
    loginRequest,
    RoleMiddleware,
    PermissionMiddleware
]
export const _jobs: Array<object> = [
    TestJob
]
export const _queues: Array<object> = [
    TestQueue
]
export const _commands: Array<object> = [
    TestCommand
]
