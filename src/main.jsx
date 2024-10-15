import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./main.css";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
    <div className="body">
        <Provider store={store}>
            <App />
        </Provider>
    </div>
);
