import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'
import { getSession } from 'next-auth/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body

  const session = await getSession({ req })

  // if we dont have a session we return an error
  if (!session) {
    return res.status(500).json({ error: 'You have to be logged in.' })
  }

  // first get all the votes from the user

  // create the post with also an upvote as default
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
      likes: {
        create: {
          user: { connect: { email: session?.user?.email } },
          likeType: 'LIKED',
        },
      },
    },
  })
  res.json(result)
}
