import express from 'express'
import { database } from './infra/database/MongoDB'
import { MONGO_URL, APP_PORT } from './infra/config/Env'
import router from './infra/web/routes'

const app = express()

app.use(express.json())
app.use(router)

database
  .connect(MONGO_URL)
  .then(() => {
    app.listen(APP_PORT, () =>
      console.log(`Server is running! Listening on port: ${APP_PORT}`)
    )
  })
  .catch(console.error)
