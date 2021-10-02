import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'
import { useSession, getSession } from 'next-auth/client'

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const postId = req.query.id
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    })
    res.json(post)
  }
  if (req.method === 'POST') {
    const likes = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        likes: { increment: 1 },
        likedByUsers: { connect: { email: session?.user?.email } },
      },
    })
    res.json(likes)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
