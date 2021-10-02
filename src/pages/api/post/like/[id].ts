import type { NextApiRequest, NextApiResponse } from 'next'
import { useSession, getSession } from 'next-auth/client'

import prisma from '../../../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req })
    const postId = req.query.id

    const likes = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        likes: { increment: 1 },
        likedByUsers: {
          connect: { id: session?.user_id },
        },
      },
    })
    res.json(likes)
  } catch {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// // DELETE /api/post/:id
// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const session = await getSession({ req })
//   const postId = req.query.id
//   if (req.method === 'POST') {
//     const likes = await prisma.post.update({
//       where: { id: Number(postId) },
//       data: {
//         likes: { increment: 1 },

//       },
//     })
//     res.json(likes)
//     //some code here
//   }if (req.method === 'POST') {
//     const likes = await prisma.post.upsert({
//       where: { id: Number(postId) },
//       create: {
//         likes: { increment: 1 }
//       },
//       update: {
//         likes: { decrement: 1 }
//       },

//     })
//     res.json(likes)

//   }else {
//     throw new Error(
//       `The HTTP ${req.method} method is not supported at this route.`
//     )
//   }
// }
