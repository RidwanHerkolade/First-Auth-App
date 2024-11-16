import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // const users = auth.currentUser
      console.log("users logged in successfully");
      toast.success("user logged in successfully", {
        position: "top-center",
      });
      navigate("/profile")
    } catch (error) {
      console.log(error.message);
      toast.error("error.message", {
        position: "top-center",
      });
    }
  };
  return (
    <div className="login__divs">
      <form className="form" onSubmit={signIn}>
        <h1>Login</h1>
        <div className="form__div">
          <div className="form__divs">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form__divs">
            <label htmlFor="password">Password</label>
            <div className="input">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div className="reg">
            Don't have an account{" "}
            <Link to="/register" className="link">
              register here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
