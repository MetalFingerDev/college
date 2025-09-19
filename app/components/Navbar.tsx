"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
      {/* Logo */}
      <h1 className="text-2xl font-bold">MyApp</h1>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link href="/Login" className="hover:text-gray-200">
          Login
        </Link>
        <Link href="/" className="hover:text-gray-200">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

