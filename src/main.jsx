import React, { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";


function AppWrapper() {
  const [loginCount, setLoginCount] = useState(0);

  useEffect(() => { }, [loginCount]);

  return (
    <Provider store={store}>
      {/* <StrictMode> */}
      <GoogleOAuthProvider clientId="865108403314-eq8hrrqg8f7b2u2gn8sfnkrsta7lhp5m.apps.googleusercontent.com">
        <App key={loginCount} setLoginCount={setLoginCount} />
      </GoogleOAuthProvider>
      {/* </StrictMode> */}
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);
