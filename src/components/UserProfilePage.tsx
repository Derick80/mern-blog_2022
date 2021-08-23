import Router from 'next/router'

export type UserProfilePageProps = {
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

const UserProfilePage: React.FC<{ props: UserProfilePageProps[] }> = ({
  props,
}) => {
  return (
    <div>
      {/* {props.map((item) => (
        <div key={item.id}>
          <h2> {item.nickname} </h2>
          <p>{item.bio} </p>
        </div>
      ))} */}
    </div>
  )
}

export default UserProfilePage
