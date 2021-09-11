import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nickname, country, city, bio, avatar_url } = req.body

  const session = await getSession({ req })
  const result = await prisma.profile.create({
    data: {
     avatar_url: avatar_url,
      nickname: nickname,
      country: country,
      city: city,
      bio: bio,
      user: { connect: { email: session?.user?.email } },
    },
  })
  res.json(result)
}
