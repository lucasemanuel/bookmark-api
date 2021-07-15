import express from 'express'
import { database } from './infra/database/MongoDB'
import { MONGO_URL, APP_PORT } from './infra/config/Env'
import router from './infra/web/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerConfig from './swagger.json'

const app = express()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
app.use('/v1', router)

database
  .connect(MONGO_URL)
  .then(() => {
    app.listen(APP_PORT, () =>
      console.log(`Server is running! Listening on port: ${APP_PORT}`)
    )
  })
  .catch(console.error)
