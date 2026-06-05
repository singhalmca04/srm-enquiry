import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
const apiUrl = process.env.REACT_APP_API_URL;

function GoogleLoginPage() {
  const [user, setUser] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    console.log("Google Token:", credentialResponse);

    try {
      const res = await fetch(apiUrl + "/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });
      const data = await res.json();
      console.log("Backend Response:", data);
      // store JWT
      localStorage.setItem("token", data.token);
      // store user
      setUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login with Google</h2>

      {!user ? (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      ) : (
        <div>
          <h3>Welcome {user.name}</h3>
          <img src={user.image} alt="profile" width="100" />
        </div>
      )}
    </div>
  );
}

export default GoogleLoginPage;