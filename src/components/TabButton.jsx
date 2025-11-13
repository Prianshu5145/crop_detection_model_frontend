import React from "react";
import { NavLink } from "react-router-dom";

export default function TabButton({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center text-xs transition-colors ${
          isActive ? "text-green-600 font-bold" : "text-gray-600"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {label}
    </NavLink>
  );
}
