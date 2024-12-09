import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle } from "lucide-react";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const LoginUser = import.meta.env.VITE_REISTER_API_URL; 
    useEffect(() => {
      const userCookie = Cookies.get("user");
      console.log(userCookie)
      if (!userCookie) {
        navigate("/login");
      }
    }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${LoginUser}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log(userData); 

     
        Cookies.set("user", JSON.stringify(userData), { expires: 7 });

        
        navigate("/dashboard");
      } else {
        const data = await response.json();
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again." ,`${err}`);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 w-screen">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 w-full sm:w-96">
        <div className="flex justify-center">
          <UserCircle className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Dashboard
        </h2>

        <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Not an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
