import { Request, Response } from 'express'
import { Controller } from '../interfaces/controller'
import { AuthCreateService } from '@/layered-apps/auth/application/service/auth-create-service'
import { AuthCreateMemoryRepository } from '@/layered-apps/auth/domain/repositories/auth-create-memory-repository'
import { v4 as uuidv4 } from 'uuid'

const authCreateService = new AuthCreateService(
  new AuthCreateMemoryRepository()
)

export class AuthCreateController implements Controller {
  public async callback (req: Request, res: Response): Promise<void> {
    const id = uuidv4()
    const reqData = Object.assign({}, req.body, {
      id
    })
    const authCreateData = await authCreateService.create(reqData)
    const response =
      typeof authCreateData.toJSON === 'function'
        ? authCreateData.toJSON()
        : authCreateData

    if (response.password !== undefined) {
      delete response.password
    }

    if (response.errors !== undefined && response.errors !== null) {
      res.status(400)
    } else {
      res.status(201)
    }

    res.json(response)
  }
}
