import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Candidates from "./pages/Candidates";
import Voters from "./pages/Voters";
import Results from "./pages/Results";

import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* User routes */}

        <Route path="/" element={<Login />} />

        <Route path="/candidates" element={<Candidates />} />

        <Route path="/voters" element={<Voters />} />

        <Route path="/results" element={<Results />} />


        {/* Admin routes */}

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;
