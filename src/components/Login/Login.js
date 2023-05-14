import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import "../../styles/Login/Login.css";
import helper from "../../helper/helper";
import LandingPage from "../LandingPage";

const LOGIN_URL = "/api/login";

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      setAuth({ username, password, accessToken });
      setUsername("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      setErrMsg("Login Failed");
      errRef.current.focus();
    }
  };

  console.log(errMsg);

  return (
    <>
      {success ? (
        <div>
          <LandingPage></LandingPage>
        </div>
      ) : (
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
      )}
    </>
  );
}
