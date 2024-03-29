import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { getAllEvents } from "./features/events/eventSlice";
import { ETogglers, toggleSetFalse } from "./features/togglers/togglerSlice";

// store.dispatch(getAllEvents())
store.dispatch(toggleSetFalse(ETogglers.userMenu))
store.dispatch(toggleSetFalse(ETogglers.homeSidebar))

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);
