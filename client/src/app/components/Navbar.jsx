"use client";

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navBackground navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/home">
          FabFinder
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/developer">
                Developer
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/">
              Log out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
