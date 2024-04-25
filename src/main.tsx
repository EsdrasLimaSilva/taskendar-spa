import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import StoreProvider from "./StoreProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StoreProvider>
        <App />
    </StoreProvider>,
);
