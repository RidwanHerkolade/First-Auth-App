import React, { useState } from "react";
import "./Login.css";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const {handleSubmit, register, formState:{errors}} = useForm()

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="form__div">
          <div className="form__divs">
            <label htmlFor="email">Email</label>
            <div className="input">
              <input
                type="text"
                // value={email}
                 name= "email"
                // onChange={(e) => setEmail(e.target.value)}
                // required
                {...register("email", {
                  required: "your email is required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
               
              />
            </div>
            {errors.email && <p className="errors">{errors.email.message}</p>}
          </div>
          <div className="form__divs">
            <label htmlFor="password">Password</label>
            <div className="input">
              <input
                type="text"
                {...register("password", { required: "enter your password"})}
              />
            </div>
            {errors.password && <p className="errors">{errors.password.message}</p>}
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
