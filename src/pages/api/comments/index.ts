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
  const postId = Number(req.query.id)
  if (req.method === 'POST') {
    const comment = await prisma.comment.create({
      data: {
        content: content,
        author: { connect: { email: session?.user?.email } },
      },
    })
    res.json(comment)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
