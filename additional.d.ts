type UserProfilePageProps = {
  id: number
  nickname: string
  country: string
  city: string
  bio: string
  user: {
    name: string
    email: string
  } | null
}
