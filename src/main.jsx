import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { UserProvider } from "./context/UserState.jsx";
import { QuizProvider } from "./context/QuizState.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <QuizProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QuizProvider>
    </UserProvider>
  </React.StrictMode>
);
