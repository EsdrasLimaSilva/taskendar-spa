import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import StoreProvider from "./StoreProvider.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Auth0Provider
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!}
        domain={import.meta.env.VITE_AUTH0_DOMAIN!}
        authorizationParams={{
            redirect_uri: window.location.origin,
            scope: "read:current_user",
        }}
        cacheLocation="localstorage"
    >
        <StoreProvider>
            <App />
        </StoreProvider>
    </Auth0Provider>,
);
