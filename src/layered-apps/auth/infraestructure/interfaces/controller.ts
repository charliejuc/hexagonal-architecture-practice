import { Request, Response } from 'express'

export interface Controller {
  callback(req: Request, res: Response): Promise<void>
}
