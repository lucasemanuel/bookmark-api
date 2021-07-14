import { Router } from 'express'
import LinkController from '../controllers/LinkController'

const linksRouter = Router()
linksRouter.post('/', LinkController.store)

export default linksRouter
