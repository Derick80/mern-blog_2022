import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../utils/prisma'
import { getSession } from 'next-auth/client'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get post id and type from the req body
  const { userProfileId, type } = req.body

  const session = await getSession({ req })
  // if we dont have a session we return an error
  if (!session) {
    return res.status(500).json({ error: 'You have to be logged in.' })
  }

  // first get all the likes from the user

  try {
    const likes = await prisma.like.findMany({
      where: {
        user: { email: session?.user?.email },
      },
    })

    console.log('the users likes', likes)

    // now we check if the user has liked on this requested post and save it in variable - true or false

    const hasLiked = likes.find((like) => like.userProfileId === userProfileId)

    console.log('has the user liked: ', hasLiked)
    // if the user has liked - remove the like and return the removed like

    if (hasLiked) {
      // if user hasLiked and the like type is not the same - we change the type

      if (hasLiked.likeType !== type) {
        const updatedLike = await prisma.like.update({
          where: {
            id: Number(hasLiked.id),
          },
          data: {
            likeType: type,
          },
        })

        console.log('updated like', updatedLike)

        return res.json(updatedLike)
      }

      const deletedLike = await prisma.like.delete({
        where: {
          id: Number(hasLiked.id),
        },
      })

      console.log('deleted like', deletedLike)
      return res.json(deletedLike)
    }

    // otherwise just create a new like and return it

    const newLike = await prisma.like.create({
      data: {
        likeType: type,
        user: {
          connect: { email: session?.user?.email },
        },
        userProfile: {
          connect: { id: Number(userProfileId) },
        },
      },
    })
    console.log('new like: ', newLike)
    return res.json(newLike)
  } catch (e) {
    console.log('the error is', e)
    res.json(e)
  }
}
