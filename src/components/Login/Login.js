import { useRef, useState, useEffect } from "react";
import helper from "../../helper/helper";
import { useDispatch } from "react-redux";
import { setAuth } from "../../redux/auth_reducer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LOGIN_URL = "/api/login";

export default function Login() {
  const dispatch = useDispatch();

  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await helper.post(
        LOGIN_URL,
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.data.token;

      window.localStorage.setItem("token", accessToken);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + window.localStorage.getItem("token");

      const user = response?.data?.data.user;
      window.localStorage.setItem("user", JSON.stringify(user));

      setAuth({ accessToken, user });
      const auth = {
        username,
        password,
        accessToken,
        user,
      };

      let link = "";
      if (user.role === "USER") {
        link = "/";
      } else if (user.role === "ADMIN") {
        link = "/admin";
      } else {
        link = "/login";
      }

      dispatch(setAuth({ auth }));
      setUsername("");
      setPassword("");
      navigate(link);
    } catch (error) {
      setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            ref={userRef}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button>Sign In</button>
        </form>
        <p>
          Need an Account? <br />
          <span className="line">
            <a href="/">Sign Up</a>
          </span>
        </p>
      </section>
    </>
  );
}
