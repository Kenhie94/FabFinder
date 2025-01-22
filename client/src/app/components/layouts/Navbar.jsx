"use client";

import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
  }

  return (
    <nav className="navBackground navbar navbar-expand-lg">
      <div className="container-fluid">
        <div>
          <Link className="navbarLogoStyle navbar-brand ms-5 fs-1 fw-1" href="/home">
            FabFinder
          </Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-5 fs-4 fw-bold">
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="nav-link" onClick={handleLogout} href={"/"}>
                Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
