import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function Login() {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: usernameState,
        password: passwordState,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Invalid username or password");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: data,
        });
        window.location.href = "/profile";
      })
      .catch((error) => {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: error.message,
        });
      });
  };

  return (
    <div className="heading">
      <h2>Login</h2>
      
      <form>
        <input
          type="text"
          placeholder="UserName..."
          value={usernameState}
          onChange={(e) => setUsernameState(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password..."
          value={passwordState}
          onChange={(e) => setPasswordState(e.target.value)}
        />
        <br />
        <NavLink to="/profile" onClick={handleLogin}>
          Login
        </NavLink>
      </form>
    </div>
  );
}

export default Login;
