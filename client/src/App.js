import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MenuAppBar from "./component/AppBar";
// import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <MenuAppBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
