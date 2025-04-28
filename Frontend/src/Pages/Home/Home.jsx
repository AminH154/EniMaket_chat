import React, { useState, useEffect } from "react";
import "./Home.css";
import RightSideBar from "../../Components/RightSideBar/RightSideBar";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import Chat from "../../components/Chat/Chat";
import axios from "axios";
import { assets } from "../../assets/assets";
import { fetchUser,fetchUsers } from "../../utils/ApiRoutes"; // Assurez-vous que cette fonction est correctement importée

const Home = () => {
  const [dataUser, setDataUser] = useState({
    name: "",
    bio: "",
    avatar: assets.utilisateur,
  });
  const [allUser, setAllUser] = useState([

  ]);


  const getUser = async () => {
    const userId = localStorage.getItem("userId"); 
    console.log("userId", userId);
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      const response = await axios.get(fetchUser(userId), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const user = response.data.user;
        setDataUser({
          name: user.userName,
          bio: user.bio,
          avatar: `http://localhost:5000/${user.avatar}`, 
        });

      }else {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          response.statusText
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données utilisateur :",
        error
      );
    }
  };


  const getAllUser = async ()=>{
    try{
        const token = localStorage.getItem("token");
        console.log("token", token);
          if (!token) {
            console.error("Token is missing");
            return; 
          }
      const response  = await axios.get(fetchUsers,{
        headers : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }

      })
      if (response.status === 200) {
        setAllUser(response.data.users);
        console.log("User data:", response.data.users);
      }else {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          
        );
      }
      
    
  }catch (error) {
    console.error(
      "Erreur lors de la récupération des données utilisateur :",
      error
    );
  }
}


  useEffect(() => {
    getUser();
    getAllUser();
  }, []); 


  return (
    <div className="home">
      <div className="chat_container">
        <LeftSideBar allUser ={allUser} />
        <Chat name={dataUser.name}  avatar={dataUser.avatar} />
        <RightSideBar name={dataUser.name} bio={dataUser.bio} avatar={dataUser.avatar} />
      </div>
    </div>
  );
};

export default Home;