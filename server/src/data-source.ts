import "reflect-metadata"
import {DataSource} from "typeorm"

require('dotenv').config({ path: `.env.${process.env.APP_ENV}` })

export default new DataSource({
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT!),
    username: process.env.TYPEORM_USER,
    password: process.env.TYPEORM_PASS,
    database: process.env.TYPEORM_DB,
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entities/*.ts"],
    migrations: [
        __dirname + '/migrations/*.ts'
    ],
    subscribers: [],
})
