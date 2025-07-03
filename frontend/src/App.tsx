import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./pages/AdminLogin";
import AddDonation from "./pages/AddDonation";

import RegisterAdmin from "./pages/RegisterAdmin";
import VerifyAdmin from "./pages/VerifyAdmin";
function App() {
  return (
    <div className="poppins-thin">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterAdmin />} />
          <Route path="/verify" element={<VerifyAdmin />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/add-donation" element={<AddDonation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;