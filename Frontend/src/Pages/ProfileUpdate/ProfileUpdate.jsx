import React, { useState } from "react";
import "./ProfileUpdate.css";
import { assets } from "../../assets/assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfileRoutes } from "../../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";

const ProfileUpdates = ({ onProfileUpdated }) => {
  const Navigate = useNavigate();
  const [Avatar, SetAvatar] = useState(assets.utilisateur);
  const [Values, SetValues] = useState({
    userName: "",
    bio: "hello ! this is my bi",
    avatar: assets.utilisateur,
  });

  const HandleChange = (e) => {
    SetValues({
      ...Values,
      [e.target.name]: e.target.value,
    });
  };

  const toastOption = {
    theme: "dark",
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };

  const HandleSave = async (e) => {
    e.preventDefault();
    console.log("handleSave called with values:", Values);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(
        "Vous devez être connecté pour mettre à jour votre profil",
        toastOption
      );
      Navigate("/");
      return;
    }

    const formData = new FormData();
    formData.append("userName", Values.userName);
    formData.append("bio", Values.bio);

    // Get the file input element
    const fileInput = document.getElementById("avatar");
    if (fileInput.files[0]) {
      formData.append("avatar", fileInput.files[0]);
    }

    try {
      console.log("Sending request to:", updateProfileRoutes);
      const response = await fetch(updateProfileRoutes, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        console.error("Error during form submission:", data);
        toast.error(data.msg || "Une erreur est survenue", toastOption);
        return;
      }

    

      if (onProfileUpdated) {
        onProfileUpdated();
      }
      console.log("Profile updated successfully:", data);
      toast.success("Profile updated successfully:", toastOption);
      setTimeout(() => {
        Navigate("/Home");
      }, 2000);
     

    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Erreur réseau ou serveur", toastOption);
    }
  };

  const HandleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        SetAvatar(reader.result);
        SetValues((prevValue) => ({
          ...prevValue,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profileUpdate">
      <div className="profile_container">
        <form onSubmit={HandleSave}>
          <div className="profile_header">
            <h1>Update Profile</h1>
            <label htmlFor="avatar">
              <img src={Avatar} alt="Avatar" />
              <p>Upload Image</p>
            </label>
            <input
              name="avatar"
              type="file"
              onChange={HandleImageChange}
              id="avatar"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <div className="input">
            <input
              name="userName"
              value={Values.userName}
              onChange={HandleChange}
              type="text"
              placeholder="Name"
              required
            />
            <textarea
              name="bio"
              value={Values.bio}
              onChange={HandleChange}
              placeholder="Write a portfolio bio"
            />
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdates;
