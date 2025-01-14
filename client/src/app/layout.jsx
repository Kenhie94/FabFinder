"use client"; // Required for React hooks in Next.js

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current route

  return (
    <html lang="en">
      <body className="d-flex flex-column min-vh-100">
        {/* Conditionally render Navbar */}
        {pathname !== "/" && <Navbar />}
        <div className="flex-grow-1">{children}</div>
        {/* Conditionally render Footer */}
        {pathname !== "/" && <Footer />}
      </body>
    </html>
  );
}
