import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import toast from "react-hot-toast";
const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("User logged in", formData);
    let responseData;
    await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("Auth-token", responseData.token);
      window.location.replace("/");
      toast.success("User logged In");
    } else {
      toast.error(responseData.error);
      console.log(responseData.error);
    }
  };

  const signup = async () => {
    console.log("User Signed up", formData);

    let responseData;
    await fetch(`${process.env.REACT_APP_BASE_URL}/user/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("Auth-token", responseData.token);
      window.location.replace("/login");
      console.log("User created");
    } else {
      alert(responseData.error);
    }
  };

  return (
    <div className="loginSignup">
      <div className="loginSignup-container">
        <h1>{state}</h1>

        <div className="loginSignup-fields">
          {state === "Sign Up" ? (
            <input
              value={formData.name}
              onChange={changeHandler}
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
            />
          ) : (
            <></>
          )}
          <input
            value={formData.email}
            onChange={changeHandler}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <input
            value={formData.password}
            onChange={changeHandler}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          type="submit"
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginSignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login here.
            </span>
          </p>
        ) : (
          <p className="loginSignup-login">
            Crate an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here.
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
