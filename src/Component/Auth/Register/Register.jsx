import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate()
  const register = async (e) => {
    e.preventDefault();
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
      <form className="form" onSubmit={register}>
        <h1>Sign up</h1>
        <div className="form__div">
          <div className="form__divs">
            <label htmlFor="email">email</label>
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
            <label htmlFor="firstName">first name</label>
            <div className="input">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form__divs">
            <label htmlFor="lastName">Last Name</label>
            <div className="input">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
