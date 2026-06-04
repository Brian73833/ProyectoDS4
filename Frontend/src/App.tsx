import { Route, Routes, Navigate } from "react-router-dom";
import AuthLogin from "./pages/AuthLogin.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLogin />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}
