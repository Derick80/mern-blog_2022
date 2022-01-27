type UserProfilePageProps = {
  id: number
  avatar_url?: string
  nickname: string
  country: string
  city: string
  bio: string
  favorite?: number
  views: number
  user: {
    id: number
    name: string
    email: string
    image: string
  } | null
  likes: Like[]
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
  postImage?: string | null | undefined
  author: {
    name: string
    email: string
    image: string
  } | null
  authorId: number
  content: string
  published: boolean
  comments: []
  categories: []
  views: number
  likes: Like[]
  likedByUsers: []
  likedById: number
  userLiked: number
  createdAt: object | null

  updatedAt: object | null
}

interface Comment {
  id: number
  author: string
  authorId: number
  postId: number
  content: string
  createdAt: string
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
  views: number
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
  likes: Like[]
  views: number
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
    likes: Like[]
    views: number
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
  views: number
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
  postImage: String
}

interface Like {
  id: number
  likeType: string
  user: User[]
  userId: number
  post: Post[]
  comments: Comment[]
  postId: number
  commentId: number
}
