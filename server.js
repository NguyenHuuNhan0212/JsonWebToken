const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use('/api', authRoutes)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server chạy ở cổng', process.env.PORT)
        })
    })
    .catch(err => console.log(err))