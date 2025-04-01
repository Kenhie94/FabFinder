"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function LandingPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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
  }, [pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isRegistering && formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const url = isRegistering ? "/api/register" : "/api/login";
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        if (isRegistering) {
          setMessage("Registration successful! Please log in.");
          setIsRegistering(false); // Switch to login mode after successful registration
        } else {
          // Store the token in localStorage
          localStorage.setItem("token", result.token);
          setMessage("Login successful!");
          router.push("/home"); // Redirect to home page on successful login
        }
      } else {
        setMessage(result.error || "An error occurred.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 pt-5">
      <div className="backgroundImg card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">{isRegistering ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {isRegistering && (
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Processing..." : isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setMessage("");
              }}
            >
              {isRegistering ? "Log in" : "Sign up"}
            </button>
          </small>
        </div>
        {message && <p className="text-center mt-3">{message}</p>}
      </div>
    </div>
  );
}
