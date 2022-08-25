import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Alert } from "./Alert";
export function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [validPassword, setValidPassword] = useState(false);
  const [checks, setChecks] = useState([
    { title: "1 Mayus character", state: false },
    { title: "1 Minus character", state: false },
    { title: "1 Special character", state: false },
    { title: "9 characters long", state: false },
  ]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  function hasLowerCase(str) {
    return /[a-z]/.test(str);
  }

  function hasUpperCase(str) {
    return /[A-Z]/.test(str);
  }

  function hasSpecialChar(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  const handlePasswordChange = (e) => {
    let pass = e.target.value;
    setUser({ ...user, password: pass });
    let checksCheck = checks;

    checksCheck[2].state = hasSpecialChar(pass);
    checksCheck[1].state = hasLowerCase(pass);
    checksCheck[0].state = hasUpperCase(pass);
    checksCheck[3].state = pass.length >= 9;

    setChecks(checksCheck);
  };

  return (
    <div className="w-full max-w-xs m-auto text-black">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="youremail@company.tld"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />

          <div>
            {checks.map((item) => {
              return (
                <div key={item.title} >
                  <p style={item.state ? {color: "green"} : {color: "black"}}>{item.state ? "✓ " : "○ "}
                   {item.title}</p>
                </div>
              );
            })}
          </div>
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3">
        Already have an Account?
        <Link to="/login" className="text-blue-700 hover:text-blue-900">
          Login
        </Link>
      </p>
    </div>
  );
}
