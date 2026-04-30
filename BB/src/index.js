// const express = require('express')  // -> CommonJS
import express from 'express'          // -> ES Module

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World! 라 그러더라고')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})