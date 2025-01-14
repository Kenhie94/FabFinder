"use client";

import Link from "next/link";
import "./style.css"

export default function Footer() {
  return (
    <footer className="navBackground d-flex justify-content-center text-center">
      <div className="flex-column">
        <a href="https://www.github.com/kenhie94">
          <img src="/favicon/github.gif" alt="Github Icon" className="faviconLinks m-3"/>
        </a>
        <a href="https://www.linkedin.com/in/kenjyjap/">
          <img src="/favicon/linkedin.png" alt="LinkedIn Icon" className="faviconLinks m-3"/>
        </a>
        <p>
          FabFinder is not affiliated with Legend Story Studios®. Flesh and Blood™ is a registered trademark of Legend Story Studios. All related images and content are copyright © Legend Story
          Studios. All rights reserved.
        </p>
        <p>© 2025 FabFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}
