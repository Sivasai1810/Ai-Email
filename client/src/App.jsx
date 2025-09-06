import { BrowserRouter, Routes, Route } from "react-router-dom";
import Send from "./home/send";
import Login from "./auth/login";
import Dashboard from "./controls/dashboard";
import Profile from './controls/profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/page" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Send />} />
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
