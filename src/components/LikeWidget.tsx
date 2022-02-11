

import { useSession } from 'next-auth/client'

import React, { useEffect, useState } from 'react'


import { calculateLikeCount, getLikes } from '../hooks'


type Props = {
    postId: number
    likes: Like[]
}

const LikeWidget = ({ postId }: Props) => {
    const [somelikes, setSomelikes] = useState<Like[]>()
    // const { id, likeType, userId } = somelikes
    useEffect(() => {
        getLikes(postId)
        return
    }, [postId, somelikes])


    console.log("someLIkes", somelikes)
    return (
        <div className="stupid">
            My likes here
            {calculateLikeCount}
        </div>
    )
}
export default LikeWidget