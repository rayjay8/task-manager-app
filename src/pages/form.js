import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { useHistory, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { AuthContext, useFetchUserId } from "../context/AuthContext";
import { unsetToken } from "../auth";
import Router from "next/router";

const form = () => {
  const [minTime, setMinTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);

  const { user, id } = useFetchUserId();

  useEffect(() => {
    if (id) {
      fetch(
        "http://192.168.29.217:1337/api/categories" +
          "?filters[userId][$eq]=" +
          id
      )
        .then((response) => response.json())
        .then((data) => {
          setCategories(data.data);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    const time = moment(e.target.time.value, "HH:mm").format("HH:mm:ss");
    const priority = e.target.priority.value;
    const uid = uuidv4();
    const category = e.target.category.value;
    const userId = id;
    const task = {
      title,
      description,
      date,
      time,
      priority,
      category,
      uid,
      userId,
    };
    fetch("http://192.168.29.217:1337/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    e.target.time.value = "";
    e.target.title.value = "";
    e.target.description.value = "";
    e.target.category.value = "None";
    e.target.priority.value = "a";
  };

  const [loading, setLoading] = useState(true);

  const myRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.form}>
      <Head>
        <title>Add a task</title>
      </Head>
      <div className={success ? styles.success : styles.hide}>
        <h1>Task added successfully! </h1>
        <Link href="/" className={styles.home}>
          See all Tasks
        </Link>
      </div>
      <h1 className={styles.heading}>Add a new task</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div
            className={styles.column}
            style={{
              width: "100%",
            }}
          >
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className={styles.column}>
            <label htmlFor="category">Category</label>
            <select name="category" id="category">
              <option value="None">None</option>
              {categories.map((category) => (
                <option value={category.category} key={category.id}>
                  {category.attributes.category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.column}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            style={{
              height: "150px",
            }}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.row}>
            <label htmlFor="date">Time</label>
            <input type="time" id="time" name="time" required />
            <input
              type="date"
              id="date"
              name="date"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="priority">Priority</label>
            <select name="priority" id="priority" required>
              <option value="a">Low</option>
              <option value="b">Medium</option>
              <option value="c">High</option>
            </select>
          </div>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default form;
