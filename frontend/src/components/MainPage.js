import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const MainPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {

      // Perform signup logic
      if (isSignup) {
        
        const response = await axios.post("http://127.0.0.1:8000/member/list/", {
          "baseUser": {
            "username": username,
            "password": password,
            "passwordCheck": passwordCheck,
            "first_name": first_name,
            "last_name": last_name,
            "email": email
          },
          "birthDate": "09.11.1990"
        });
        console.log("Signup successful:", response.data);

      } 
      
       // Perform login logic
      else {
       
        const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
          username,
          password,
        });
        console.log("Login successful:", response.data);
      }

      // Clear form inputs and error message
      setUsername("");
      setPassword("");
      setEmail("")
      setPasswordCheck("")
      setError("");
    } catch (error) {
        console.log(error)
        // Handle the error response
        if (error.response) {
          // The request was made and the server responded with an error status
          const errorData = error.response.data;
          const errorMessage = errorData.detail || "Error occurred. Please try again.";
          setError(errorMessage);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setError("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error:", error.message);
          setError("Error occurred. Please try again.");
        }
      }
  };

  return (
    <div className="login-page">
      <div className="description">
        <h2>Welcome to the App!</h2>
        <p>This is a description of the app.</p>
      </div>
      <div className="form-container">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
              />

              <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            
              <input 
                type="text"
                placeholder="First name"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />


              <input 
                type="text"
                placeholder="Last name"
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </>
            
          )}
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p>
          {isSignup
            ? "Already have an account? "
            : "Don't have an account? "}
          <span className="link" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MainPage;
