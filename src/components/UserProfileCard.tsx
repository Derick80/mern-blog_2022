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
        <div className="w-full max-w-lg m-auto py-10 mt-10 px-10 border">
          <div className="userInfo">
            <p className="username">{nickname}</p>
            <p className="username">{bio}</p>
            <p className="username">{country}</p>

            <p className="username">{avatar_url}</p>
            <a
              className="website"
              href={website}
              target="_blank"
              rel="noreferrer"
            >
              {website}
            </a>

            <div className="avatarContainer">
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
            className="mt-4 w-full bg-green-400 hover:bg-green-600 text-green-100 border shadow py-3 px-6 font-semibold text-md rounded"
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
