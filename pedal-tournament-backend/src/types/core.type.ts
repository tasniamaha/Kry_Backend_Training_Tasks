import type { NextFunction, Request, Response } from 'express'

export type CommonController = (req: Request, res: Response) => Promise<void>

export type SyncRouterHandler = (req: Request, res: Response, next: NextFunction) => unknown
