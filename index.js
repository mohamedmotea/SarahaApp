import { config } from 'dotenv'
import express from 'express'
import db_connection from './DB/connections.js'
import globalResponse from './src/Middlewares/globalResponse.js'
import * as router from './src/Modules/index.routers.js'
import cors from 'cors'
config({path:'./config/dev.config.env'})
const app = express()
app.use(express.json())
const port = process.env.PORT

app.use(cors())
app.use('/api/v1/auth',router.auth)
app.use('/api/v1/user',router.user)
app.use('/api/v1/message',router.message)

app.use(globalResponse)
db_connection()




app.listen(port, () => console.log(`Example app listening on port ${port}!`))