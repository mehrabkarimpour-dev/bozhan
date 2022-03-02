# bozhan

BOZHAN framework

dependencies : 
- nodejs 
- redis ( if you want using queue system )
- npm
- typescript


for develop bozhan framework run this commands :

- git clone  https://github.com/mehrabkarimpour-dev/bozhan.git

- cd bozhan

- cp .env.example .env   // in windows => copy .env.example .env

- npm install 

- npm run dev
___________________________________________________________________________________________________
Routing :

Roots are in two files

1- /route/api/index.ts
2- /route/web/index.ts
Their differences in is prefix !

1- /route/api/index.ts   http://localhost.local/api
2- /route/web/index.ts   http://localhost.local/

for separate  route  you can using prefix 
-  prefix can not getting middleware or form request...


From Request with errros : 
auth.post('/login',
            validate(LoginRequest),
            handleErrors(LoginRequest),
            controller(LoginController, 'index'))

Using Middleware in Routes: 

auth.get('/logout',
            middleware('auth'),
            controller(LogoutController, 'index'))
            
extra middlewares  :


  middleware('role', ['admin']),
  middleware('permission', ['canEdit'])
 ___________________________________________________________________________________________________

Middlewares :

Generally middlewares defined in two directory 

- /app/http/middleware/published    // you need registering its in /app/http/middleware/index.ts
- /app/http/requests

/app/http/requests Are related to form validations
 
 
 middleware example : 
 export class AuthMiddleware {


    // @ts-ignore
    public static name: string = 'auth'
    public static hasParams: boolean = false
    public static parameters: any = null

    /**
     *   ! information
     *  if params be equal to true for getting params you need
     *  in route passing all parameters to middleware in second param...
     */

    constructor(parameters: object | string | null = null) {
        AuthMiddleware.parameters = parameters
    }

    public async run(req: Request, res: Response, next: NextFunction) {
            if (your condition ){
                    return next()
            }
         return req.status(403).json()
    }

}



form request example : 

class LoginRequest extends RequestsForm {

    public static params: any = null

    constructor() {
        super();
    }

    public static validParams: object = [
        'mobile',
        'password'
    ]

    public static  _name: string = 'loginValidation'

    public validate() {
        return [
            body('mobile').not().isEmpty().withMessage('mobile is required'),
            body('password').not().isEmpty().withMessage('password is required'),
        ]
    }

    public handle(req: Request, res: Response, next: NextFunction) {
        req.body = RequestsForm.filterParamValid(req.body, LoginRequest.validParams)
        const validationErrors = validationResult(req)
        if (validationErrors && validationErrors['errors'].length > 0)
            return res.status(401).json(validationErrors)
        return next()
    }
}

export default LoginRequest;

- Only parameters registered in validParams are sent to the controller

 
            
            
            
