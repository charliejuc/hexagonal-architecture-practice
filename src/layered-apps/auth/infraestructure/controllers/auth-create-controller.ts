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
    const reqData = Object.assign({}, req.body, {
      id: uuidv4()
    })
    const authCreateData = await authCreateService.create(reqData)
    const response =
      typeof authCreateData.toJSON === 'function'
        ? authCreateData.toJSON()
        : authCreateData

    res.status(201)

    res.json(response)
  }
}
