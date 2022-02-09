import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'
import { getSession } from 'next-auth/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get post id and type from the req body
  const { postId } = req.body

  // first get all the likes from the user

  const likes = await prisma.like.findMany({
    where: { postId: postId },
  })

  res.json(likes)
}

// const session = await getSession({ req })
// const result = await prisma.post.create({
//   data: {
//     title: title,
//     content: content,
//     likes: likes,
//     author: { connect: { email: session?.user?.email } },
//   },
// })
// res.json(result)
