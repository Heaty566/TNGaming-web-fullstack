import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import { store } from "./js/stores/configStore";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
