import React, { useState, useEffect, ChangeEvent } from "react";
import { Alert } from "@mui/material";
import prisma from "../../utils/prisma";
import { useSession } from "next-auth/client";
import { useQuery } from "react-query";
import { getUserProfile } from '../../hooks'
import UserProfileCard from "../../components/UserProfileCard";
import CreateProfile from "./create";
import ProfileForm from "../../components/ProfileForm";

const UserProfile = () => {
  const [session] = useSession();



  const { data: profile, status, error } = useQuery("profile", getUserProfile);
  // const { nickname, country, city, bio, avatar_url, website, id, userId, updatedAt}=profile
  console.log("profile", profile);

  if (!session) {
    return (
      <Alert onClose={() => { }}>
        You need to be authenticated to view this page.
      </Alert>
    );
  } else if (status === "loading") {
    return <div>profile is loading</div>;
  } else if (status === "success" && !profile.profile) {
    return <ProfileForm />;
  } else if (status === "success" && profile) {
    return (
      <>
        <ProfileForm {...profile} />
      </>
    );
  } else {
    return <Alert onClose={() => { }}>
      Nothing so see here  </Alert>
  }
};

export default UserProfile;
