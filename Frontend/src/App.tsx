import { Route, Routes, Navigate } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/auth" element={<AuthLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
}
