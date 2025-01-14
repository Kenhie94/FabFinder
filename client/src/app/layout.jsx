"use client"; // Required for React hooks in Next.js

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current route

  return (
    <html lang="en">
      <body>
        {/* Conditionally render Navbar */}
        {pathname !== "/" && <Navbar />}
        {children}
      </body>
    </html>
  );
}
