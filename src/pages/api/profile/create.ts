import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nickname, country, city, bio, avatar_url, website } = req.body

  const session = await getSession({ req })

  const profile = await prisma.userProfile.create({
    data: {
      avatar_url: avatar_url,
      nickname: nickname,
      country: country,
      city: city,
      bio: bio,
      website: website,
      user: { connect: { email: session?.user?.email } },
      likes: {
        create: {
          user: { connect: { email: session?.user?.email } },
          likeType: 'LIKED',
        },
      },
    },
  })
  res.json(profile)
}
