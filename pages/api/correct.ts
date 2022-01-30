// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Response } from '../../types'
import { correct } from '../../lib/wordMaster'
import { getAnswer, getCurrentGameNumber } from '../../lib/answers'
import { dayjs } from '../../lib/time'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    Response & { dateTime: string; latestGameNumber: number }
  >
) {
  const { q, no } = req.query as { q: string; no: string }
  if (!q || !no) throw new Error('params')
  const response = correct(q, getAnswer(~~no))
  const dateTime = dayjs().tz().format()
  const latestGameNumber = getCurrentGameNumber()
  res.json({ ...response, dateTime, latestGameNumber })
}
