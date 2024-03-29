import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, TextField, Button, Typography, Link, Snackbar } from "@mui/material";
import logoImage from '../assets/images/logo/logo.png';
export let isLoggedIn = false;
export let credentials = null;

const MainPage2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  
  useEffect(() => {
    const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
    const storedCredentials = sessionStorage.getItem("credentials");
  
    if (storedIsLoggedIn && storedCredentials) {
      isLoggedIn = storedIsLoggedIn === "true";
      credentials = JSON.parse(storedCredentials);
    }
  }, []);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn)
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Perform logout logic
    isLoggedIn = false;
    credentials = null;

    // Clear the stored login state from sessionStorage
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("credentials");

    setSuccessMessage("Logout successful!");
    setShowSuccess(true);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("isLoggedIn", isLoggedIn)
      console.log("isSignup",isSignup)
      // Perform signup logic
      if (isSignup) {
          const response = await axios.post("http://127.0.0.1:8000/member/list/", {
          baseUser: {
            username,
            password,
            passwordCheck,
            first_name,
            last_name,
            email,
          },
          birthDate: "09.11.1990",
        });
        // Store signup data securely
        //await Keychain.setGenericPassword(username, password);
        setSuccessMessage("SignUp successful!");
      } 
      else {
        // Perform login logic
        const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
          username,
          password,
        });
        isLoggedIn = true;
        console.log("isLoggedIn")
        // Store login data securely
        //await Keychain.setGenericPassword(username, password);
        credentials = {username, password}
        console.log(credentials)

        // Store the login state in sessionStorage
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("credentials", JSON.stringify(credentials));

        setSuccessMessage("Login successful!");
      }

      // Clear form inputs and error message
      setUsername("");
      setPassword("");
      setEmail("");
      setPasswordCheck("");
      setError("");  
      setShowSuccess(true);
      
    } catch (error) {
        if (error.response && error.response.data && error.response.data.detail) {
          setError(error.response.data.detail);
        } else if (error.message) {
          setError(error.message);
        } else {
          setError("An error occurred.");
        }
        setShowSuccess(false);
      }
  };

  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000); // Duration in milliseconds (3 seconds)
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);


  return (
    <div className="login-page">
      <div className="description">
        <h2>Welcome to the App!</h2>
        <p>This is a description of the app.</p>
      </div>

        <div> <Snackbar
            open={showSuccess}
            autoHideDuration={3000}
            onClose={() => setShowSuccess(false)}
            message={successMessage}
        /></div>


      <div className="form-container">
        
          <img
            src={logoImage}
            alt="Logo"
            style={{
              width: "400px", // Adjust the width as per your requirements
              display: "block", // Ensure the image is displayed as a block element
              margin: "0 auto", // Center the image horizontally
              marginBottom: "2rem", // Add some margin at the bottom of the image
            }}
          />  

        {isLoggedIn ?
          (
            <Paper elevation={3} sx={{ padding: "2rem" }}>
              <Typography variant="h2">Logout</Typography>
              <Button variant="contained" onClick={handleLogout}>
                Logout
              </Button>
            </Paper>
          ):
          (
            <Paper elevation={3} sx={{ padding: "2rem" }}>
            <Typography variant="h2">{isSignup ? "Sign Up" : "Login"}</Typography>
            
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleFormSubmit}>
              <TextField
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              {isSignup && (
                <>
                  <TextField
                    type="password"
                    label="Confirm Password"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                    sx={{ marginBottom: "1rem" }}
                  />
                  <TextField
                    type="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: "1rem" }}
                  />
                  <TextField
                    type="text"
                    label="First name"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                    sx={{ marginBottom: "1rem" }}
                  />
                  <TextField
                    type="text"
                    label="Last name"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    sx={{ marginBottom: "1rem" }}
                  />
                </>
              )}
  
              <Button variant="contained" type="submit">
                {isSignup ? "Sign Up" : "Login"}
              </Button>
              </form>
              
              <Typography>
                {isSignup ? "Already have an account? " : "Don't have an account? "}
                <Link onClick={() => setIsSignup(!isSignup)}>
                  {isSignup ? "Login" : "Sign up"}
                </Link>
              </Typography>
          
            </Paper>
          )
        }
      </div>
    </div>

    
  );
};

export default MainPage2;



  

    