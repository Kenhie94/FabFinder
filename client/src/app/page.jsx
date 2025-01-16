"use client"; // React hook requirement

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getUsers } from "../_actions/userActions";

export default async function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Add the class for background image when on the login/register page
    if (pathname === "/") {
      document.body.classList.add("login-background");
    } else {
      document.body.classList.remove("login-background");
    }

    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("login-background");
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      console.log("Register form submitted");
      alert("Registration successful! Please log in.");
      setIsRegistering(false);
    } else {
      console.log("Login form submitted");
      router.push("/home")
    }
  };

  const res = await getUsers();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 pt-5">
      <div className="backgroundImg card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">{isRegistering ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Shared Email Field */}
          <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input type="text" className="form-control" id="name" placeholder="Enter your username" required />
              </div>

          {/* Additional Fields for Registration */}
          {isRegistering && (
            <>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm your password" required />
              </div>
            </>
          )}

          {/* Shared Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" required />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle Between Login/Register */}
        <div className="text-center mt-3">
          <small>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" className="btn btn-link p-0" onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? "Log in" : "Sign up"}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
}