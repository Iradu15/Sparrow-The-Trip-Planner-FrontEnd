import React, { useState } from "react";

const MainPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform login or signup logic here
    // You can validate the email, password, and handle any errors
    // For simplicity, this example just displays the entered values
    console.log("Email:", email);
    console.log("Password:", password);

    if (isSignup) {
      console.log("Perform signup logic");
    } else {
      console.log("Perform login logic");
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
