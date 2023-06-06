import React, { useState } from "react";
import axios from "axios";

const MainPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Perform signup logic
      
        //login to django admin interface with parola+username pizdoase
        const response = await axios.post(
          "http://127.0.0.1:8000/admin/login/?next=/admin/",
          {
            username: "admin",
            password: "admin",
          }
        );
        
        // Check the response status to determine if the login was successful
        if (response.status === 200) {
          // Login successful, redirect to the desired admin page
          window.location.href =
            "http://127.0.0.1:8000/admin/auth/user/add/";

            // const response2 = await axios.post(
            //   "http://127.0.0.1:8000/admin/login/",
            //   {
            //     username,
            //     password,
            //   }
            // );

        } else {
          // Login failed, handle the error
          setError("Login failed. Please try again.");
        }

        console.log("Signup successful:", response.data);
      } else {
        // Perform login logic
        const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
          username,
          password,
        });
        console.log("Login successful:", response.data);
      }

      // Clear form inputs and error message
      setUsername("");
      setPassword("");
      setError("");
    } catch (error) {
      setError("Error occurred. Please try again."); // Set the error message based on the response from the API
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
            <input
              type="password"
              placeholder="Confirm Password"
              // Add necessary logic for confirming password
            />
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
