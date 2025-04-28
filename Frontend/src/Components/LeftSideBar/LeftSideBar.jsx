import React  from "react";
import "./LeftSideBar.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const LeftSideBar = ({allUser}) => {
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate("/profile-update"); // Call the function passed from the parent component
  };
  
  return (
    <div className="leftSideBar">
      <div className="ls_nav">
        <div className="ls_top">
          <img src={assets.icon} alt="" height={40} width={40} />
          <p>
            <span>U</span>ni Market_chat
          </p>
        </div>

        <div className="menu">
          <img src={assets.menu} alt="" height={40} width={40} />
          <div className="menu_list">
            <p onClick={handleEditProfile}>Edit Profile</p>
            <hr />
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="ls_search">
        <img src={assets.search} alt="" />
        <input type="text" placeholder="Search ..." />
      </div>
      <div className="ls-list">
        {
          allUser.map((user) => (
            <div className="friends " key={user._id}>
              <img src={`http://localhost:5000/${user.avatar}`} alt="" />
              <div>
                 <p>{user.userName}</p>
                 <span>En ligne</span>

              </div>
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
