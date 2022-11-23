import React, { useEffect, useState } from "react";
import "./App.css";
import NavbarEx from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages";
import Products from "./pages/Products";
import GameCharacter from "./pages/GameCharacter";
import Contact from "./pages/contact";
import Faq from "./pages/faq";
import Footer from "./pages/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFound from "./pages/notfound";
import jwt_decode from "jwt-decode";
import TokenService from "./services/token.service";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");

  const Logout = () => {
    const token = TokenService.getLocalAccessToken();
    if (token?.length > 0) {
      var decoder = jwt_decode(token);
      var expiry = new Date(1000 * decoder.exp);
      var now = new Date(Date.now());
      if (expiry <= now) {
        setIsLogged(false);
        TokenService.removeUser();
      }
    }
  };

  useEffect(() => {
    Logout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container-fluid">
      <Router>
        <NavbarEx
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          userName={userName}
          setUserName={setUserName}
        />
        <div style={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/gamecharacters" element={<GameCharacter />} />

            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/not-found" element={<NotFound />} />

            <Route path="*" element={<Navigate replace to="/not-found" />} />
          </Routes>
        </div>
        <div className="">
          <Footer />
        </div>

        <ToastContainer position="top-right" hideProgressBar />
      </Router>
    </div>
  );
}

export default App;
