type UserProfilePageProps = {
  id: number
  avatar_url?: string
  nickname: string
  country: string
  city: string
  bio: string
  favorite?: number
  user: {
    id: number
    name: string
    email: string
    image: string
  } | null
}

interface LikeProps {
  id: number
  likeType: string
  userId: number
  postId: number
  userProfileId: number
  commentId: number
}

interface PostProps {
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
  likes: Like[]
  likedByUsers: []
  likedById: number
  userLiked: number
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

interface UserProfile {
  id: number
  avatar_url: string
  nickname: string
  city: string
  country: string
  bio: string
  userId: number
  updatedAt: object | null
  website: string
  likes: Like[]
  [users: User]: User
}

interface DeProfile {
  id: number
  firstName: string
  lastName: string
  name: string
  email: string
  emailVerified: string
  image: string
  profileViews: number
  reatedAt: object | null
  updatedAt: object | null
  profile: {
    id: number
    avatar_url: string
    nickname: string
    city: string
    country: string
    bio: string
    userId: number
    updatedAt: object | null
    website: string
  }
}

interface User {
  id: number
  firstName: string
  lastName: string
  name: string
  email: string
  emailVerified: string
  image: string
  profileViews: number
  [likedPosts: Post]: Post
  [likedComments: Comment]: Comment
  [posts: Post]: Post
  [profile: Profile]: Profile
  [comments: Comment]: Comment
  createdAt: object | null
  updatedAt: object | null
}

interface PostFormInput {
  title: String
  content: String
}
