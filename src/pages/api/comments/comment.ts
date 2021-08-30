import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'

// DELETE /api/post/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: Number(postId) },
    })
    res.json(post)
  }
  if (req.method === 'POST') {
    const comment = await prisma.comment.create({
      where: { id: Number(postId) },
      data: {
        content: content,
      },
    })
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}
