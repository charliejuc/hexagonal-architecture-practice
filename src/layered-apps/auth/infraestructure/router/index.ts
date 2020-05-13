import express from 'express'
import { AuthCreateController } from '../controllers/auth-create-controller'

export function setupAuthRouter (app: express.Application): void {
  const router = express.Router()

  router.post('/create', new AuthCreateController().callback)

  app.use('/auth', router)
}