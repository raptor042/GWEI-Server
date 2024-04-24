import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { get, transfer } from "./__web3__/index.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/get", async (req, res) => {
    const response = await get()
    console.log(response)

    res.status(200).json(response)
})

app.get("/transfer/:to/:amount", async (req, res) => {
    console.log(req.params)
    const response = await transfer(req.params.to, req.params.amount)
    console.log(response)

    response ? res.status(200).send("Success") : res.status(200).send("Failed")
})

app.listen(process.env.PORT || 8000, (err) => {
    err ? console.log(err) : console.log(`Connection at 8000 is successful.`)
})