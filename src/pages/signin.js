import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "../styles/signin.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { AuthContext } from "../context/AuthContext";
import { setToken, unsetToken } from "../auth";
import { useUserId } from "../context/AuthContext";
import Link from "next/link";

const signin = () => {
  const [data, setData] = useState({
    identifier: "",
    password: "",
  });

  const { user } = useUserId();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isError, setIsError] = useState(false);

  if (isError) {
    setTimeout(() => {
      setIsError(false);
    }, 4000);
  }

  const Router = useRouter();

  const animationContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.29.217:1337/api/auth/local",
        {
          identifier: data.identifier,
          password: data.password,
        }
      );
      setToken(response.data);
      Router.push("/");
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const logout = () => {
    unsetToken();
  };

  return (
    <div className={styles.signup}>
      <div className={isError ? styles.banner : styles.hide}>
        <p>Your email or password is incorrect</p>
      </div>
      <div className={styles.left}>
        <img
          src="http://192.168.29.217:1337/uploads/dazzle_line_task_management_1bd2e304ef.gif"
          alt=""
        />
      </div>
      <div className={styles.right}>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.space}>
            <label htmlFor="identifier">Username or Email:</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={data.identifier}
              onChange={(e) => setData({ ...data, identifier: e.target.value })}
            />
          </div>
          <div className={styles.space}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link href="/signup">
            <span>Register here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default signin;
