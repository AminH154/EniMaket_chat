
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login"
import ProfileUpdate from "./Pages/ProfileUpdate/ProfileUpdate"
import './App.css'
import Register from "./Pages/Register/Register"
import Home from "./Pages/Home/Home"
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default App;
