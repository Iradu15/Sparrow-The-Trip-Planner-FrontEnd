import "./LogSign.css";
import "../assets/CSS/general-style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, TextField, Button, Typography, Link, Snackbar } from "@mui/material";
import logoImage from '../assets/images/logo/logo.png';

export let isLoggedIn = false;
export let credentials = null;

const MainPage = () => {
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
  
  const inputStyle = {
    marginBottom: "1rem",
  }

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
    <div className="login-page__wrapper">
      <div className="login-page__left"></div>

        <div> <Snackbar
            open={showSuccess}
            autoHideDuration={3000}
            onClose={() => setShowSuccess(false)}
            message={successMessage}
        /></div>


      <div className="login-page__form-container">

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
            <div>
              <div class="login-page__welcome">
                <h1>Hey, hello! 👋</h1>
                <h5>
                  {
                    isSignup ? "let's sign you up" 
                    : "let's log you in"
                  }
                </h5>
              </div>
              
              {error && <Typography color="error">{error}</Typography>}
              <form class="login_page__form" onSubmit={handleFormSubmit}>
                {!isSignup && (
                  <>
                    <TextField
                      type="text"
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={inputStyle}
                    />
                    <TextField
                      type="password"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={inputStyle}
                    />
                  </>                  
                )}
                {isSignup && (
                  <>
                    <TextField
                      type="text"
                      label="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={inputStyle}
                    />
                    <div class="login-page__input-wrapper">
                      <TextField
                        type="text"
                        label="First name"
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                        style={inputStyle}
                      />
                      <TextField
                        type="text"
                        label="Last name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <div class="login-page__input-wrapper">
                      <TextField
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                      />
                      <TextField
                        type="password"
                        label="Confirm Password"
                        value={passwordCheck}
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                    <TextField
                      type="email"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={inputStyle}
                    />
                  </>
                )}
    
                <Button 
                  variant="contained" 
                  type="submit"
                  style={{backgroundColor: "#BD4949"}}
                >
                  {isSignup ? "Sign up" : "Log in"}
                </Button>

                <Typography
                  style={{marginTop: "0.5rem"}}
                >
                  {isSignup ? "Already have an account? " : "Don't have an account? "}
                  <Link onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Log in" : "Sign up"}
                  </Link>
                </Typography>
                </form>
            </div>
          )
        }
      </div>
    </div>

    
  );
};

export default MainPage;

