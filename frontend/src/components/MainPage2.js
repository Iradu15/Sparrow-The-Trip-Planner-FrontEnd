import React, { useState, useEffect } from "react";
import axios from "axios";
import { Paper, TextField, Button, Typography, Link, Snackbar } from "@mui/material";

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
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
        setSuccessMessage("SignUp successful!");
      } else {
        // Perform login logic
        const response = await axios.post("http://127.0.0.1:8000/auth/login/", {
          username,
          password,
        });
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
      // Handle the error response
      if (error.response) {
        // The request was made and the server responded with an error status
        const errorData = error.response.data;
        const errorMessage =
          errorData.detail || "Error occurred. Please try again.";
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
          src="data:image/jpeg;base64,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"
          alt="Logo"
          style={{
            width: "400px", // Adjust the width as per your requirements
            display: "block", // Ensure the image is displayed as a block element
            margin: "0 auto", // Center the image horizontally
            marginBottom: "2rem", // Add some margin at the bottom of the image
          }}
        />  

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
      </div>
    </div>

    
  );
};

export default MainPage;
