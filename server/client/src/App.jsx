import { BrowserRouter, Routes, Route } from "react-router-dom";
import Send from "./home/send";
import Login from "./auth/login";
import Dashboard from "./controls/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/page" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
