import { ChakraProvider } from "@chakra-ui/react";

import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; // Specify weight
import "@fontsource/outfit/500.css"; // Specify weight
import "@fontsource/outfit/600.css"; // Specify weight
import "@fontsource/outfit/700.css"; // Specify weight
import "@fontsource/outfit/800.css"; // Specify weight
import "@fontsource/outfit/900.css"; // Specify weight
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import theme from "./theme.js";
import { AuthProvider } from "./utils/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
