import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/users/${userId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch user information");
        }
      })
      .then((data) => {
        dispatch({ type: "SET_USER", payload: data });
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, userId]);

  return (
    <div className="heading">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default Profile;