import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  const onSuccessGoogleLogin = (response) => {
    const decoded = jwtDecode(response.credential);
    localStorage.setItem("token", decoded.jti);
    navigate("/product-list");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/product-list");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      Login
      <GoogleOAuthProvider clientId={googleClientId}>
        <GoogleLogin
          onSuccess={(response) => {
            onSuccessGoogleLogin(response);
          }}
          onError={(error) => console.log(error)}
          width={"300px"}
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default Login;
