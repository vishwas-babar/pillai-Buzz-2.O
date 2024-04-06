import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.user.status);
  const authLoading = useSelector((state) => state.user.loading);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    console.log("this is authStatus: ", authStatus);
    console.log("this is authLoading: ", authLoading);

    if (authLoading) {
      return;
    }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, authLoading, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default Protected;
