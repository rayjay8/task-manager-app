import React, { useState } from "react";
import styles from "../styles/signup.module.css";
import axios from "axios";
import Link from "next/link";
import { AuthContext, useFetchUserId } from "../context/AuthContext";

const signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { user, id } = useFetchUserId();

  // if user exists, redirect to home page
  if (user) {
    window.location.href = "/";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.29.217:1337/api/auth/local/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.signup}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link href="/signin">
          <span>Sign in</span>
        </Link>
      </p>
    </div>
  );
};

export default signup;
