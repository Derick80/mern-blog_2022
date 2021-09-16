import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const { nicknames, countrys, citys, bios, avatar_urls, websites } = req.body
 
  const result = await prisma.profile.update({
   where: { 
      userId: session?.user_id
   },
    data: {
     avatar_url: avatar_urls,
      nickname: nicknames,
      country: countrys,
      city: citys,
      bio: bios,
      website: websites,

    },
  })
  res.json(result)
}
//might have to change id and profile idea using Number