import React from "react";
import Link from "next/link";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container flex flex-col md:flex-row justify-between items-center px-4 md:py-4 py-2 me-5">
      <div className="flex justify-between w-full">
        <Link href="/" className="logo text-2xl font-bold sm:mr-4">
          Explore Earth
        </Link>
      </div>
      <nav
        className={`nav-links hidden md:flex md:flex-row md:justify-end justify-between mx-5 `}
      >
        <div className={`md:flex justify-around items-center m-2 hidden`}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
