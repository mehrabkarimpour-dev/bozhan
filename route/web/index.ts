import LoginController from "../../app/http/controllers/auth/LoginController";

const router = require('express-namespace-routes')
import {controller, handleErrors, middleware, validate} from "../../vendor/core/autoload/call";
import RegisterController from "../../app/http/controllers/auth/RegisterController";
import LoginRequest from "../../app/http/requests/loginRequest";
import LogoutController from "../../app/http/controllers/auth/LogoutController";
import RegisterRequest from "../../app/http/requests/registerRequest";
import IndexController from "../../app/http/controllers/IndexController";


router.prefix('/', (route: any) => {


    /*
    * role permission middleware example...
    * you can define role permission in database or redis
    * */

    route.get('/',
        middleware('agent'),
        controller(IndexController, 'index', 'home'))

    route.prefix('/auth', (auth: any) => {

        auth.post('/login',
            middleware('agent'),
            validate(LoginRequest),
            handleErrors(LoginRequest),
            controller(LoginController, 'index'))

        auth.post('/register',
            middleware('agent'),
            validate(RegisterRequest),
            handleErrors(RegisterRequest),
            controller(RegisterController, 'register'), // first register
            controller(LoginController, 'index'))     // login user after register

        auth.get('/register',
            middleware('agent'),
            controller(RegisterController, 'register'),
            controller(LoginController, 'index'))
        auth.get('/logout',
            middleware('agent'),
            middleware('auth'),
            controller(LogoutController, 'index'))
    })

})


export default router

