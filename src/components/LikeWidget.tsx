import Typography from '@mui/material/Typography'
import prisma from '../utils/prisma'
import { useSession } from 'next-auth/client'
import { Router } from 'next/router'
import React, { useEffect, useState } from 'react'

import { useQuery } from 'react-query'
import { log } from 'console'
import { getLikes } from '../hooks'

type Props = {
    likes: Like[]
}

const LikeWidget = ({ likes }: Props) => {
    const [somelikes, setSomelikes] = useState(getLikes())





    return (
        <div className="stupid">
            My likes here
        </div>
    )
}
export default LikeWidget