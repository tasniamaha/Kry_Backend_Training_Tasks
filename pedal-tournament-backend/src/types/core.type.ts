import type { Request, Response } from 'express'

export type CommonController = ({ req, res }: { req: Request, res: Response }) => Promise<void>
