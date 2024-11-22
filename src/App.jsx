import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import UsersPage from "./pages/UsersPage";
import RolesPage from "./pages/RolesPage";

const App = () => {
  return (
    <Router>
      <Header />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="*" element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
