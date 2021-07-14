import express from 'express'
import linksRouter from './LinksRouter'

const app = express()

app.use('/links', linksRouter)

export default app
