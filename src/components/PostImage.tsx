/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { supabase } from '../utils/sup'


type PostImageProps = {
    url?: string
    onUpload: Function
}

function PostImage({ url }: { url: string | null }) {
    const [postImageUrl, setPostImageUrl] = useState<string | null>(null)

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage
                .from('blog-images')
                .download(path)
            if (error) {
                throw error
            }
            const url = URL.createObjectURL(data)
            setPostImageUrl(url)
        } catch (error) {
            console.log('Error downloading image: ', error.message)
        }
    }

    return postImageUrl ? (
        <img className="post_image" src={postImageUrl} alt='Post Image Goes here' />
    ) : (
        <div className='avatar no-image' />
    )
}

export default PostImage
