import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./Profile.module.css";

function Profile() {
  const { userid } = useParams();
  const [userProfile, setUserProfile] = useState({});

  // Fetch user data
  async function fetchUserData() {
    try {
      const response = await axios.get(`api/users/${userid}`);
      setUserProfile(response.data);
    } catch (error) {
      console.log("Error:", error);
      alert("Fetching user data failed. Please try again.");
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [userid]);

  return (
    <div className={classes.profile_container}>
      <img
        className={classes.profile_picture}
        src="https://picsum.photos/200"
        alt="Profile"
      />
      <h2 className={classes.profile_username}>{userProfile.username}</h2>
      <p className={classes.profile_name}>
        <b>Name: </b>
        {userProfile.firstname} {userProfile.lastname}
      </p>
      <div className={classes.profile_details}>
        <a href="#" className={classes.profile_email}>
          <b>Email: </b>
          {userProfile.email}
        </a>
        <a href="#" className={classes.profile_id}>
          <b>User ID: </b>
          {userid}
        </a>
      </div>
      {/* Removed Update Profile and Change Password sections */}
    </div>
  );
}

export default Profile;
