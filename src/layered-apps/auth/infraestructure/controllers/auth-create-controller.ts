import { Request, Response } from 'express'
import { Controller } from '../interfaces/controller'
// import { AuthCreateService } from '@/layered-apps/auth/application/service/auth-create-service'
// import { AuthCreateMemoryRepository } from '@/layered-apps/auth/domain/repositories/auth-create-memory-repository'

// const authCreateService = new AuthCreateService(
//   new AuthCreateMemoryRepository()
// )

export class AuthCreateController implements Controller {
  public async callback (req: Request, res: Response): Promise<void> {
    // const data = authCreateService.create(req.body)
    res.send(req.body)
  }
}
