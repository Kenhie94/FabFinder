"use client";

import "./style.css"

export default function Footer() {
  return (
    <footer className="navBackground d-flex justify-content-center text-center">
      <div className="flex-column">
        <a href="https://www.github.com/kenhie94">
          <img src="/favicon/github.png" alt="Github Icon" className="faviconLinks m-3"/>
        </a>
        <a href="https://www.linkedin.com/in/kenjyjap/">
          <img src="/favicon/linkedin.png" alt="LinkedIn Icon" className="faviconLinks m-3"/>
        </a>
        <p className="fw-normal fs-5">
          FabFinder is not affiliated with <a href="https://legendstory.com/">Legend Story Studios</a>®. <a href="https://fabtcg.com/en/">Flesh and Blood</a>™ is a registered trademark of Legend Story Studios. All related images and content are copyright © Legend Story
          Studios. All rights reserved.
        </p>
        <p className="fw-normal fs-5">© 2025 FabFinder. All rights reserved.</p>
      </div>
    </footer>
  );
}
