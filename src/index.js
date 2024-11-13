import React from "react";
import ReactDOM from "react-dom";
import App from "./App"; // Import the main App component
import "./styles.css"; // Import your CSS styles

// Render the App component into the root element of the HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
