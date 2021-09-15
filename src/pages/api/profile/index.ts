import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import prisma from '../../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {


  const session = await getSession({ req })
 
  const result = await prisma.profile.findUnique({
    where: { id: session?.user_id}
  }
   
  )
  res.json(result)
}
