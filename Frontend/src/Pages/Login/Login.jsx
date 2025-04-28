import React, { useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginRoutes } from "../../utils/ApiRoutes";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const Navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const toastOption = {
    theme: "dark",
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called with values:", values);

    if (handleValidation()) {
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };

        console.log("Payload envoyé :", payload);

        const response = await fetch(LoginRoutes, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erreur lors de l'appel API :", errorData);
          toast.error(errorData?.msg || "Une erreur est survenue", toastOption);
          return;
        }

        const data = await response.json();
        console.log("Réponse de l'API :", data);
        if (data.status) {
          
          
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          console.log("Utilisateur connecté :", data.user);
          toast.success("Connexion réussie", toastOption);
          setTimeout(() => {
            Navigate("/Home");
          }, 2000);
         
        } else {
          toast.error(data?.msg || "Une erreur est survenue", toastOption);
        }
      } catch (error) {
        console.error("Erreur lors de l'appel API :", error);
        toast.error("Erreur de connexion au serveur", toastOption);
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = values;

    if (!validateEmail(email)) {
      toast.error("Email invalide", toastOption);
      return false;
    }
    if (!email || !password) {
      toast.error("Veuillez remplir tous les champs", toastOption);
      return false;
    }
    if (password.length < 6) {
      toast.error(
        "Le mot de passe doit contenir au moins 6 caractères",
        toastOption
      );
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login_container_left">
          <img src={assets.icon} alt="Logo" height={100} width={100} />
          <p className="text">
            <span>U</span>ni Market_chat
          </p>
        </div>
        <div className="login_container_right">
          <form onSubmit={handleSubmit}>
            <div className="input">
              <h1>Login</h1>
              <input
                name="email"
                onChange={handleChange}
                value={values.email}
                type="email"
                placeholder="Email"
              />
              <input
                name="password"
                onChange={handleChange}
                value={values.password}
                type="password"
                placeholder="Password"
              />
              <button type="submit">Login</button>
              <p onClick={() => Navigate("/Register")} className="register">
                Don't have an account? <span>Click here</span>
              </p>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
