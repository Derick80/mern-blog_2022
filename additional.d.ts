type UserProfilePageProps = {
  id: number
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
  coments: []
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
