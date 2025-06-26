import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';
import icon from "../../../assets/icon.jpg";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // Common style classes
  const linkBase =
    'block md:inline px-3 py-2 rounded-md font-medium text-[#F2F2F2] hover:bg-[#EAE4D5] hover:text-black transition-all';
  const active =
    'bg-[#B6B09F] text-black font-semibold shadow-md';

  return (
    <nav className="bg-black shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-[#F2F2F2] tracking-wide">
         <img src={icon} width={50} height={50} className="rounded-full object-cover border-2 border-[#EAE4D5]" />

        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          <NavLink to="/" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Home</NavLink>
          <NavLink to="/facility" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Facility</NavLink>
          <NavLink to="/signup" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Signup</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Contact</NavLink>
        </div>

        {/* Mobile menu button */}
        <button onClick={toggle} className="md:hidden text-[#F2F2F2]">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a1a] px-4 pb-4 pt-2 space-y-2">
          <NavLink to="/" onClick={toggle} className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Home</NavLink>
          <NavLink to="/facility" onClick={toggle} className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Facility</NavLink>
          <NavLink to="/signup" onClick={toggle} className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Signup</NavLink>
          <NavLink to="/contact" onClick={toggle} className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
