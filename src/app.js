import express from "express";
import dotenv from 'dotenv'
import { isAuthenticated } from "./utils/utils.js";
import swaggerUi from 'swagger-ui-express'
import specs from "./utils/swagger-config.js";

import migrate from "./data_base/migration.js";

import authRouter from "./routes/auth.js";


const app = express()
dotenv.config()

//accept the body in the request
app.use(express.json())
const port = process.env.PORT

//migrate tha Db
migrate()

app.use("/api/auth", authRouter)

app.get("/protected", isAuthenticated, (req, res) => {
    res.json({ success: true, msg: "Welcome user!!", email: req.user
    });
});

//swagger documentation 
app.use('/', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}))

app.listen(port, (req, res)=>{
    console.log("Listening port ", port)
})