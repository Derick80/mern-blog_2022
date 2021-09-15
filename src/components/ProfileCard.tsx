import Image from 'next/image'

export default function ProfileCard({ profile }: { profile: Profile }) {
    const lastUpdated = profile.updatedAt ? new Date() : null
    return (
      <div className="w-full max-w-lg m-auto py-10 mt-10 px-10 border">
       <Image
              className="image"
              src={profile.avatar_url}
              alt='myimage'
              width='60'
              height='60'
            />
        <div className="userInfo">
          <p className="username">{profile.nickname}</p>
          <p className="username">{profile.bio}</p>
          <p className="username">{profile.country}</p>
          <p className="username">{profile.city}</p>
          <a className="website" href={profile.website} target="_blank" rel="noreferrer">
          {profile.website}
        </a>
          <p>
            <small>
              Last updated{' '}
              {lastUpdated
                ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
                : 'Never'}
            </small>
          </p>
        </div>
        <div />
      </div>
    )
  }