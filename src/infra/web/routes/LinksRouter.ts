import { Router } from 'express'
import LinkController from '../controllers/LinkController'

const linksRouter = Router()
linksRouter.get('/', LinkController.list)
linksRouter.post('/', LinkController.store)
linksRouter.delete('/:id', LinkController.delete)

export default linksRouter
