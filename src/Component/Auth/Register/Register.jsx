import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const Register = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const {handleSubmit, register, formState:{errors}} = useForm()
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    // e.preventDefault();
    const { email, password, firstName, lastName } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "User", user.uid), {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
        });
      }
      console.log("users registered successfully");
      toast.success("user registered successfully", {
        position: "top-center",
      });
      navigate('/')
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };
  return (
    <div className="login__divs">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign up</h1>
        <div className="form__div">
          <div className="form__divs">
            <label htmlFor="email">email</label>
            <div className="input">
              <input
                type="text"
                // value={email}
                name="email"
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
            <label htmlFor="firstName">first name</label>
            <div className="input">
              <input
                type="text"
                name = "firstName"
                // value={firstName}
                // onChange={(e) => setFirstName(e.target.value)}
                // required
                {...register("firstName", {
                  required: "your firstname is required",
                  
                })}
              />
            </div>
            {errors.firstName && <p className="errors">{errors.firstName.message}</p>}
          </div>
          <div className="form__divs">
            <label htmlFor="lastName">Last Name</label>
            <div className="input">
              <input
                type="text"
                // value={lastName}
                name="lastName"
                // onChange={(e) => setLastName(e.target.value)}
                // required
                {...register("lastName", {
                  required: "your lastname is required",
                  
                })}
              />
            </div>
            {errors.lastName && <p className="errors">{errors.lastName.message}</p>}
          </div>
          <div className="form__divs">
            <label htmlFor="password">Password</label>
            <div className="input">
              <input
                type="password"
                name="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                // required
                // required
                {...register("password", { required: "enter your password"})}
              />
            </div>
            {errors.password && <p className="errors">{errors.password.message}</p>}
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
          <div className="reg">
            Already have an account{" "}
            <Link to="/" className="link">
              log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
