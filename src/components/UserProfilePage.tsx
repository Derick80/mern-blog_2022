import Router from 'next/router'

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
