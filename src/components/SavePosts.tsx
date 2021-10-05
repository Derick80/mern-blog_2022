import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useSession } from 'next-auth/client'

interface IProps<T> {
    data: {
        post: PostProps
        profiles: UserProfile
    },

}

const SavePost = <T extends unknown>({ data }: IProps<T>) => {

    const [session] = useSession()
    const hasFavorited = data.likes.find((favorite) => favorite.userId === session?.userId)
    return (<div></div>)
}

export default SavePost