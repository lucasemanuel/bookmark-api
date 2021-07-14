import dotenv from 'dotenv'
dotenv.config()

export const MONGO_URL = process.env.MONGO_URL || ''
export const APP_PORT = process.env.PORT || ''
