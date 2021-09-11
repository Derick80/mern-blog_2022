type UserProfilePageProps = {
  id: number
  avatar_url?:string
  nickname: string
  country: string
  city: string
  bio: string
  user: {
    name: string
    email: string
    image: string
  } | null
}

type PostProps = {
  id: number
  title: string
  author: {
    name: string
    email: string
    image: string
  } | null
  authorId: number
  content: string
  published: boolean
  comments: {
    id: number
    content: string
    author: string
  }
  categories: []
  views: number
  likes: number
  createdAt: object | null

  updatedAt: object | null
}
type CommentProps = {
  id: number
  author: {
    name: string
    email: string
    image: string
  } | null
  authorId: number
  postId: number
  content: string
  published: boolean
  comments: []
  categories: []
  views: number
  likes: number
  createdAt: object | null

  updatedAt: object | null
}

type CategoryProps = {
  id: number
  name: string

  post: {
    id: number
  }
}

interface moreJSX extends IntrinsicElements {
  nav_right: any
  nav_left: any
}


interface Profile {
  id: number      
  avatar_url?:string 
  nickname:string    
  city:string         
  country:string      
  bio:string
  updatedAt: object | null
  website: string
  user:{}   
   userId:number 
}