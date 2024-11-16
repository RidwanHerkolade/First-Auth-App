import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Profile.css";
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const fetchUserData = () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        try {
          const docRef = doc(db, "User", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
          } else {
            console.log("User data does not exist");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      setUserDetails(null);
      console.log("user logged out successfully")
      navigate("/")
    } catch(error) {
      console.error("error logging out:", error)
    }
  };
  return (
    <div className="profile__divs">
      <div className="profile__content">
        <h2>Welcome {userDetails?.firstName} 🙏🙏 </h2>
        {userDetails ? (
          <div className="profile__contents">
            <div className="email">
              name: {userDetails?.firstName} {userDetails?.lastName}
            </div>
            <div className="email">email: {userDetails?.email}</div>
            <div>
            <button onClick={signOut}>Log out</button>
          </div>
          </div>
        ) : (
          <p>loading.....</p>
        )}
      </div>
    </div>
  );
};
export default Profile;


