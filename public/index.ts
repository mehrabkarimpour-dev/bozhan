import "reflect-metadata"
import express, {NextFunction, Request, request, Response, response} from 'express';
import db from '../app/models/sequelize';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import appConfig from "config/app";
import databaseConfig from '../config/database'
import Passport from "../app/auth/passport";
import Queue from 'bull';

const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const passport = require('passport')
require('dotenv').config()
const session = require('express-session')
const routeCache = require('route-cache')

import Config from "../vendor/config/Config"
import http from 'http';
import webRouter from '../route/web/index';
import apiRouter from '../route/api/index';
import {config} from "dotenv";
import wb from "../app/socket/ws";
import SocketIo from "../app/socket/socket.io";
import {graphqlHTTP} from 'express-graphql'
import {schema, root} from "../app/graphql/schema";
/*import Graphql from "../app/graphql";*/
/*import graphqlHttp from "express-graphql";*/
import welcome from "../vendor/core/cli/welcome";
import cli from "../vendor/core/cli/cli";
import {redisConfig} from "../config/database";
import {injectableServiceProvider} from "../app/providers/injectableServiceProvider";
import * as redis from 'redis';
import declares from "../app/@types";
import peer from "../app/web-rtc/peer";
import chalk from "chalk";
import {Schedule} from "../vendor/core/schedule/schedule";
import {boolean} from "yargs";

const app = express()

class Index {

    public expressApp: any


    constructor() {
        this.setCli()
        this.setSchedule()
        this.setExpressConfig()
        this.setAppConfig()
        this.setDatabaseConfig()
        this.setRoutersConfig()
        this.setWebSocketConfig()
        this.setGraphQl()
        this.setQueueJob()
        this.setEventConfig()
        this.setWebRtcConfig()
        this.activeServices()
    }


    public activeServices() {
        setTimeout(() => {
            console.log(chalk.cyan(`---------------Active Services------- `))
            console.log(chalk.cyan(` ${process.env.ACTIVE_MONGODB == 'true' ? 'mongo' : ''}             `))
            console.log(chalk.cyan(`--------------------------------------- `))
        })
    }

    public setWebRtcConfig() {
        peer()
    }

    public setSchedule() {
        let _schedule = new Schedule()
        _schedule.run()
    }

    public setCli() {
        cli()
        welcome()
    }

    public setEventConfig() {
        //emitter.emit('testEvent')
    }

    public setQueueJob() {

    }

    public setGraphQl() {

        app.use('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
                schema: schema,
                rootValue: root,
                graphiql: true,
            })),
        );
    }

    public async setWebSocketConfig() {
        await wb.connection()
        // SocketIo.setServer(this.expressApp)
        // SocketIo.connection()
    }

    public setExpressConfig() {
        this.expressApp = http.createServer(app)
        if (process.env.RELATION_BE_ACTIVE)
            db.sequelize.sync().then(() => {
                this.expressApp.listen(appConfig.port, () => {
                    console.log(chalk.blue(`express server running on port ${process.env.APP_PORT || 5000} successfully...`))
                })
            });
        else
            this.expressApp.listen(appConfig.port, () => {
                console.log(chalk.blue(` port : ${process.env.APP_PORT || 5000}`))
                console.log(chalk.blue(` HOST : ${process.env.HOST || 'localhost'}`))
            })
    }

    public setDatabaseConfig() {

        if (process.env.ACTIVE_MONGODB == 'true')
            mongoose.connect(databaseConfig.mongoUrl).then(res => {
            }).catch(err=>{
                throw err
            })
    }

    public setRoutersConfig() {
        app.use(webRouter, routeCache.cacheSeconds(24 * 60 * 60 * 60, process.env.APP_KEY || 'app_key'))
        // app.use('/api', apiRouter)
    }

    public setAppConfig() {
        app.use(express.static('./'))
        app.set('view engine', 'ejs')
        app.set('views', './resources/views')
        app.use(express.json())
        //app.set("layout extractScripts", true)
        // app.set("layout extractStyles", true)
        // app.set("layout", "layouts/home")
        //app.use(expressLayouts)
        // end set directories

        declares(app)
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        //app.use(validator())

        app.use(session({
            secret: "mySecretKey",
            resave: false,
            saveUninitialized: true,
            cookie: {secure: true}
            /*resave: true,
            saveUninitialized: true,
            cookie: {expires: new Date(Date.now() + (10000 * 60 * 24 * 30))},
            store: new MongoStore({
                mongooseConnection: mongoose.connection
            })*/
        }))

        app.use(cookieParser('mySecretKey'))
        app.use(flash())
        app.use(passport.initialize())
        app.use(passport.session())

        Passport()
        //app.use(rememberLogin.handle)
        // app.use((req: any, res: any, next:any) => {
        //     app.locals = new middlewares(req).getObjects()
        //     next()
        // })

    }

}

export default Index
