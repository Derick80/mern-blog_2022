// pages/api/post/index.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nickname, country, city, bio } = req.body

  const session = await getSession({ req })
  const result = await prisma.profile.create({
    data: {
      nickname: nickname,
      country: country,
      city: city,
      bio: bio,
      user: { connect: { email: session?.user?.email } },
    },
  })
  res.json(result)
}
