import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import STRINGS from "./i18n/strings";

// Screens
import Dashboard from "./screens/Dashboard";
import Mandi from "./screens/Mandi";
import Finance from "./screens/Finance";
import Advisory from "./screens/Advisory";
import Detector from "./screens/Detector";
import Health from "./screens/Health";
import Sell from "./screens/Sell";
import Auth from "./screens/Auth";
import Home from "./screens/Home";
import Login from "./screens/login"

// Components
import TabButton from "./components/TabButton";

// 🔹 Inner component to access `useLocation`
function AppContent({ t, lang, setLang, farmerName, setFarmerName, onLogin, logout }) {
  const location = useLocation();

  // Hide layout elements on the home page
  const hideLayout = location.pathname === "/home" || location.pathname === "/login";


  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* 🌾 Header */}
      {!hideLayout && (
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="text-xl font-bold">
            🌾 {t.app}{" "}
            {farmerName && <span className="text-sm">— {farmerName}</span>}
          </div>

          <div className="flex gap-2">
            {/* Language Selector */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="border rounded p-1"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>

            {/* Auth Button */}
            {farmerName ? (
              <button onClick={logout} className="text-sm underline">
                {t.logout}
              </button>
            ) : (
              <Link to="/account" className="text-sm underline">
                {t.signIn}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* 🌿 Body */}
      <div
        className={`flex-1 overflow-y-auto ${
          hideLayout ? "" : "p-4 pb-20"
        }`} // ✅ No padding for /home
      >
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home t={t} />} />
            <Route path="/dashboard" element={<Dashboard t={t} />} />
            <Route path="/mandi" element={<Mandi t={t} />} />
            <Route path="/finance" element={<Finance t={t} />} />
            <Route path="/advisory" element={<Advisory t={t} />} />
            <Route path="/detect" element={<Detector t={t} />} />
            <Route path="/health" element={<Health t={t} />} />
            <Route path="/sell" element={<Sell t={t} />} />
           
             <Route path="/login" element={<Login t={t} />} />
          </Routes>
        </AnimatePresence>
      </div>

      {/* ⚙️ Bottom Navigation Tabs */}
      {!hideLayout && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t p-2 grid grid-cols-7">
          <TabButton to="/dashboard" label={t.dashboard} icon="🏠" />
          <TabButton to="/mandi" label={t.mandi} icon="🧾" />
          <TabButton to="/finance" label={t.finance} icon="🏦" />
          <TabButton to="/advisory" label={t.advisory} icon="🧑‍🌾" />
          <TabButton to="/detect" label={t.detect} icon="📷" />
          <TabButton to="/health" label={t.health} icon="🏥" />
          <TabButton to="/sell" label={t.sell} icon="🛒" />
        </div>
      )}
    </div>
  );
}

// 🔹 Main App Wrapper
export default function App() {
  const [lang, setLang] = useState("en");
  const [farmerName, setFarmerName] = useState(null);
  const t = STRINGS[lang];

  function onLogin(name) {
    setFarmerName(name);
  }

  function logout() {
    setFarmerName(null);
  }

  return (
    <Router>
      <AppContent
        t={t}
        lang={lang}
        setLang={setLang}
        farmerName={farmerName}
        setFarmerName={setFarmerName}
        onLogin={onLogin}
        logout={logout}
      />
    </Router>
  );
}
