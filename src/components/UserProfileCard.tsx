import Image from "next/image";
import { useState } from "react";
import EditProfile from "../pages/profile/edit";
import Avatar from "../components/Avatar";

type Props = {
  profile: DeProfile;
};

const ProfileCard = ({ profile }: DeProfile) => {
  const {
    nickname,
    country,
    city,
    bio,
    avatar_url,
    website,
    id,
    userId,
    updatedAt,
  } = profile;
  const [edit, setEdit] = useState(false);
  // const pItems = profile.profile.map(item=> item)
  const handleEditClick = (e: React.SyntheticEvent) => {
    return setEdit(true);
  };

  const lastUpdated = updatedAt ? new Date() : null;
  console.log(
    nickname,
    country,
    city,
    bio,
    avatar_url,
    website,
    id,
    userId,
    updatedAt
  );

  if (edit === false) {
    return (
      <>
        <div >
          <div >
            <p>{nickname}</p>
            <p>{bio}</p>
            <p>{country}</p>

         
            <a
              
              href={website}
              target="_blank"
              rel="noreferrer"
            >
              {website}
            </a>

            <div >
              <Avatar url={avatar_url} />
            </div>
            <p>
              <small>
                Last updated{" "}
                {lastUpdated
                  ? `${lastUpdated.toLocaleDateString()} ${lastUpdated.toLocaleTimeString()}`
                  : "Never"}
              </small>
            </p>
          </div>
          <button
           
            type="submit"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      </>
    );
  } else {
  }
  return (
    <div>
      <EditProfile {...profile} />
    </div>
  );
};

export default ProfileCard;
