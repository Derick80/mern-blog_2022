import React, { useState, useEffect, ChangeEvent } from "react";
import prisma from "../../utils/prisma";
import { useSession } from "next-auth/client";
import { useQuery } from "react-query";
import UserProfileCard from "../../components/UserProfileCard";
import CreateProfile from "./create";

const UserProfile = () => {
  const [session] = useSession();

  const getProfile = async (props: any) => {
    const response = await fetch("http://localhost:8077/api/profile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    const { profile } = data;
    return profile;
  };

  const { data: profile, status, error } = useQuery("profile", getProfile);
  // const { nickname, country, city, bio, avatar_url, website, id, userId, updatedAt}=profile
  console.log("profile", profile);

  if (!session) {
    return (
      <div>
        <h1>My Profile</h1>
        <div>You need to be authenticated to view this page.</div>
      </div>
    );
  } else if (status === "loading") {
    return <div>profile is loading</div>;
  } else if (status === "success" && !profile.profile) {
    return <CreateProfile />;
  } else if (status === "success" && profile) {
    return (
      <>
        <UserProfileCard {...profile} />
      </>
    );
  } else {
    return <div>Nothing to see here</div>;
  }
};

export default UserProfile;
