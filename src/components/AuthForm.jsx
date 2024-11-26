import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ setCurrentUser }) => {
  const [formType, setFormType] = useState("login"); // Toggle between 'login' and 'signup'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "member", // Default role for signup
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Simulate a simple backend user store
  const [userStore, setUserStore] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(""); // Clear errors on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "signup") {
      // Check if the email already exists
      const userExists = userStore.some((user) => user.email === formData.email);
      if (userExists) {
        setErrorMessage("Email already exists. Please use a different email.");
        return;
      }

      // Add the new user to the store
      setUserStore((prev) => [...prev, { ...formData }]);
      setErrorMessage("Signup successful! Please log in.");
      setFormType("login");
    } else {
      // For login, check if the user exists in the store
      const user = userStore.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        setCurrentUser(user); // Set the logged-in user
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      } else {
        setErrorMessage("Invalid email or password.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {formType === "login" ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role (Signup only) */}
          {formType === "signup" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="admin">Admin</option>
                <option value="team lead">Team Lead</option>
                <option value="member">Member</option>
              </select>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {formType === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Form */}
        <p className="mt-4 text-sm text-center">
          {formType === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() => setFormType("signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="text-blue-500 underline"
                onClick={() => setFormType("login")}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
