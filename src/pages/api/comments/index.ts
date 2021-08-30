import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'
import { getSession } from 'next-auth/client'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content } = req.body

  const session = await getSession({ req })
  const result = await prisma.comment.create({
    data: {
      content: content,
    },
  })
  res.json(result)
}
