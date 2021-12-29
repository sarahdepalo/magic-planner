import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = ({btnTxt}) => {
  const { loginWithRedirect } = useAuth0();

  return (
    // Add a redirect to Parks page
    <button onClick={() => loginWithRedirect()} className="btn btn-primary">
      {btnTxt || "Log In"}
    </button>
  );
};

export default LoginButton;
