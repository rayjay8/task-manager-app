import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "../../styles/Form.module.css";
import { useHistory, useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import moment from "moment";
import Head from "next/head";
import { AuthContext, useFetchUserId } from "../../context/AuthContext";
import { unsetToken } from "../../auth";

const form = () => {
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  const { user, id: userId } = useFetchUserId();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetch("http://192.168.29.217:1337/api/tasks/" + id)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.data.attributes.title);
        setDescription(data.data.attributes.description);
        setDate(data.data.attributes.date);
        setTime(data.data.attributes.time);
        setPriority(data.data.attributes.priority);
        setCategory(data.data.attributes.category);
      });
  }, [id]);

  useEffect(() => {
    if (userId) {
      fetch(
        "http://192.168.29.217:1337/api/categories" +
          "?filters[userId][$eq]=" +
          userId
      )
        .then((response) => response.json())
        .then((data) => {
          setCategories(data.data);
        });
    }
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const date = e.target.date.value;
    const time = moment(e.target.time.value, "HH:mm").format("HH:mm:ss");
    const priority = e.target.priority.value;
    const category = e.target.category.value;
    const task = {
      title,
      description,
      date,
      time,
      priority,
      category,
    };
    fetch("http://192.168.29.217:1337/api/tasks/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
        <title>Update Task</title>
      </Head>
      <div className={success ? styles.success : styles.hide}>
        <h1>Task updated successfully! </h1>
        <Link href="/" className={styles.home}>
          See all Tasks
        </Link>
      </div>
      <h1 className={styles.heading}>Update task</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div
            className={styles.column}
            style={{
              width: "100%",
            }}
          >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={title}
            />
          </div>
          <div className={styles.column}>
            <label htmlFor="category">Category</label>
            <select name="category" id="category" defaultValue={category}>
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
            defaultValue={description}
          />
        </div>
        <div className={styles.container}>
          <div className={styles.row}>
            <label htmlFor="date">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              required
              defaultValue={time}
            />
            <input type="date" id="date" name="date" defaultValue={date} />
          </div>
          <div className={styles.row}>
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              required
              defaultValue={priority}
            >
              <option value="a">Low</option>
              <option value="b">Medium</option>
              <option value="c">High</option>
            </select>
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default form;
