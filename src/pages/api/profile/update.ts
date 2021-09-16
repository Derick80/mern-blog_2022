import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const { nicknames, countrys, citys, bios, avatar_urls, websites } = req.body
 
  const userwithUpdatedProfile = await prisma.user.update({
   where: { 
     email: session?.user.email
   },
    data: { 
        profile:{
              update:{
                avatar_url: avatar_urls,
                nickname: nicknames,
                country: countrys,
                city: citys,
                bio: bios,
                website: websites,
               },
              },
        },
  })
  res.json(userwithUpdatedProfile)
}
//might have to change id and profile idea using Number

//found the way to do this finally. ugh

// https://github.com/prisma/prisma-examples/tree/latest/javascript/rest-nextjs