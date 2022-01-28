// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Response } from '../../types'
import { correct } from '../../lib/wordMaster'
import { getAnswer } from '../../lib/answers'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { q, no } = req.query as { q: string; no: string }
  if (!q || !no) throw new Error('params')
  const response = correct(q, getAnswer(~~no))
  res.json(response)
}
