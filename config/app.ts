import 'dotenv'

const appConfig = {
    apiBase: process.env.HAS_API_BASE || false,
    port: process.env.APP_PORT || 5000,
    host: process.env.HOST || "localhost",
    secretKey: process.env.SECRET_KEY || 'bozhan'
}

export default appConfig