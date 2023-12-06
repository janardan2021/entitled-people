// Require and configure dotenv package 
// and configure it to access .env variables
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'

import cookieParser from 'cookie-parser'

import frustationRoutes from './routes/frustations.js'
import reviewRoutes from './routes/reviews.js'
import userRoutes from './routes/users.js'

// Create an axpress app
const app = express()

// middleware
// express.json() looks if the request has some body (data) with it.
// If yes, then it parses it and attaches it to the request object
// So we can acces the data as req.body
app.use(express.json())

// to parse the cookie coming from the client
app.use(cookieParser())

// middleware
// app.use((req, res, next) => {
//     console.log(req.path, '**********', req.method)
//     next()
// })

// Routes
app.use('/api/frustations', frustationRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/users', userRoutes)

// Listen for request
// app.listen(process.env.PORT, () => {
//     console.log('listening on port 4000!!!')
// })

const __dirname = path.resolve() // Set __dirname to current directory
// console.log(__dirname)
// In console: /Users/janardan/Desktop/entitled-people

if(process.env.NODE_ENV === 'production') {
    // Set static folder to send files to thes client
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    // Any route that is not api will be directed to index.html
    app.get('*', (req, res) => 
      res.sendFile(path.resolve(__dirname, 'frontend', 'build' , 'index.html'))
    )
} else {
    app.get('/', (req,res) => {
        res.send('API is running...')
    })
}

// -------USE THIS WHEN YOU CONNECT TO THE MONODB ATLAS-------
// -------You have to create a new project and cluster in mongodb atlas---------
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        .then(() => {
                // Listen for request
                app.listen(process.env.PORT || 5000, () => {
                    console.log('listening on port 4000!!!')
                })
        })
        .catch((error) => {
            console.log(error)
        })
