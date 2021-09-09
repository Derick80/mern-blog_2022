import type { NextApiRequest, NextApiResponse } from 'next'
import { useSession, getSession } from 'next-auth/client'

import prisma from '../../../utils/prisma'

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const postId = req.query.id
  if (req.method === 'PATCH') {
    const post = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        likes: { increment: 1 },
      },
    })
    res.json(post)
    //some code here
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
