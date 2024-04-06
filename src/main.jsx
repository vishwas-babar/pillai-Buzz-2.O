import React, { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";

function AppWrapper() {
  const [loginCount, setLoginCount] = useState(0);

  useEffect(() => {}, [loginCount]);

  return (
    <Provider store={store}>
      {/* <StrictMode> */}
      <App key={loginCount} setLoginCount={setLoginCount} />
      {/* </StrictMode> */}
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);
