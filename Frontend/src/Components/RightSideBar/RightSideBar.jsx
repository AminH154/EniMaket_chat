import React from "react";
import "./RightSideBar.css";


const RightSideBar = ({name,bio,avatar}) => {


  return (
    <div className="rightSideBar">
      <div className="rs_nav">
        <div style={{ position: "relative" }}>
          <img
    
            alt="User Profile"
            src={avatar}
          />
          <div className="status"></div>
        </div>
        <h3>{name}</h3>
        <p>{bio}</p>
      </div>
      <hr />
      <p>Media</p>
      <p>Fichier et contenus multimédias</p>
      <div className="deconnecte">
        <img src={avatar  } alt="Deconnecte" />
        <p>Deconnexion</p>
      </div>
    </div>
  );
};

export default RightSideBar;
