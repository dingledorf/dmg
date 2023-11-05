require('dotenv').config({ path: `.env.${process.env.APP_ENV}` })
import * as bodyParser from "body-parser";
import type {NextFunction, Request, Response} from "express";
const { expressjwt } = require('express-jwt');
const cors = require('cors');
const cookieParser = require("cookie-parser");
import * as HardwareController from './controllers/HardwareController';
import * as AuthController from './controllers/AuthController'
import * as StatsController from './controllers/StatsController'
import "reflect-metadata";
import dataSource from "data-source";
require('express-async-errors');
const express = require('express');
const app = express();

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

const jsonErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).send({error: err});
}

const apiRouter = express
  .Router()
  .use(cookieParser())
  .use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))
  .use(expressjwt({
    secret: process.env.HMAC_SECRET,
    algorithms: ["HS256"],
    getToken: function fromHeaderOrQuerystring(req: Request) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      } else if (req.cookies && req.cookies.jwt) {
        return req.cookies.jwt;
      }
      return null;
    }
  }).unless({ path: ["/api/auth"] }))
  .use('/auth', express.Router()
    .post('/', AuthController.authenticateUser))
  .use('/hardware', express.Router()
    .get('/:id', HardwareController.findHardware)
    .get('/', HardwareController.getHardware)
    .post('/', HardwareController.createHardware)
    .put('/:id', HardwareController.updateHardware)
    .delete('/:id', HardwareController.deleteHardware)
  )
  .use('/stats', express.Router()
    .get('/', StatsController.getStatistics))

app
  .use(bodyParser.json())
  .use('/api', apiRouter)
  .use(jsonErrorHandler)
;

app.all('*', (req: Request, res: Response) => {
  return res.status(404).send();
})

app.listen(8080, () => {
  console.log("Server started on port 8080");
})