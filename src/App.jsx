
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { DataContext } from "./context/DataContext";
import Header from "./components/home/Header";
import SearchBar from "./components/home/SearchBar";
import Footer from "./components/home/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Category from "./pages/Vechile";
import SplashScreen from "./components/SplashScreen";
import PartsPage from "./pages/PartsPage";
import Contact from "./pages/Contact";
import UniversalParts from "./pages/UniversalParts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ required import


const Layout = ({ children }) => {
  const location = useLocation();
  const { loading } = useContext(DataContext);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">

      <div className="sticky top-0 z-50 bg-gray-50">
        <Header />

      </div>
      <main className="flex-grow pb-20">{children}</main>


      <Footer />
    </div>
  );
};


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vehicle" element={<Category />} />
          <Route path="/parts" element={<UniversalParts />} />
          <Route path="/parts/:vehicleId/:type" element={<PartsPage />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
          fontSize: window.innerWidth < 640 ? "0.7rem" : "0.85rem", // smaller on mobile
          padding: "6px 12px",                                       // optional smaller padding
        }}
        style={{
          top: "60px",
        }}
      />

    </Router>
  );
}

export default App;
