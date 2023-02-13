import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/components/Content.module.css";
import Task from "./Task";
import Completed from "./Completed";
import Deleted from "./Deleted";
import Link from "next/link";
import { useRouter } from "next/router";
import AnimatedText from "react-animated-text-content";
import Head from "next/head";
import { AuthContext, useFetchUserId } from "../../context/AuthContext";
import { unsetToken } from "../../auth";

const CategoryContent = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [sort, setSort] = useState("");
  const [ascending, setAscending] = useState(true);
  const [length, setLength] = useState(0);
  const [completedLength, setCompletedLength] = useState(0);
  const [deletedLength, setDeletedLength] = useState(0);
  const [displayCount, setDisplayCount] = useState(5);

  const { user, id } = useFetchUserId();

  const router = useRouter();
  const { category } = router.query;

  const handleDisplayCount = () => {
    setDisplayCount(displayCount + 5);
  };

  const handleClick = () => {
    setAscending(!ascending);
  };

  useEffect(() => {
    if (id) {
      let endpoint =
        "http://192.168.29.217:1337/api/tasks?filters[category][$eq]=" +
        category +
        "&filters[userId][$eq]=" +
        id +
        "&sort[0]=createdAt:desc";
      if (sort === "date") {
        endpoint =
          "http://192.168.29.217:1337/api/tasks?filters[category][$eq]=" +
          category;
        endpoint += "&sort[0]=date";
        if (ascending) {
          endpoint += ":asc";
        } else {
          endpoint += ":desc";
        }
      }
      if (sort === "priority") {
        endpoint =
          "http://192.168.29.217:1337/api/tasks?filters[category][$eq]=" +
          category;
        endpoint += "&sort[0]=priority";
        if (ascending) {
          endpoint += ":asc";
        } else {
          endpoint += ":desc";
        }
      }
      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setTasks(data.data);
          setLength(data.data.length);
        });
    }
  }, [category, sort, ascending, id]);

  useEffect(() => {
    if (id) {
      fetch(
        "http://192.168.29.217:1337/api/completed-tasks?filters[category][$eq]=" +
          category +
          "&filters[userId][$eq]=" +
          id +
          "&sort[0]=createdAt:desc"
      )
        .then((response) => response.json())
        .then((data) => {
          setCompletedTasks(data.data);
          setCompletedLength(data.data.length);
        });
    }
  }, [category, id]);

  useEffect(() => {
    if (id) {
      fetch(
        "http://192.168.29.217:1337/api/deleted?filters[category][$eq]=" +
          category +
          "&filters[userId][$eq]=" +
          id
      )
        .then((response) => response.json())
        .then((data) => {
          setDeletedTasks(data.data);
          setDeletedLength(data.data.length);
        });
    }
  }, [category, id]);

  return (
    <div className={styles.content}>
      <Head>
        <title>Category - {category}</title>
      </Head>
      <AnimatedText
        type="chars"
        animation={{
          x: "200px",
          y: "-20px",
          scale: 0.1,
          ease: "ease-in-out",
        }}
        animationType="wave"
        interval={0.05}
        duration={0.4}
        tag="h1"
        className="animated-paragraph"
        includeWhiteSpaces
        threshold={0.1}
        rootMargin="20%"
        style={{
          marginBottom: "50px",
          fontSize: "30px",
          color: "#FF69B4",
        }}
      >
        {category}
      </AnimatedText>
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <span
          className="material-symbols-outlined"
          style={{
            color: "#f5f5f5",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          schedule
        </span>
        <h1>Pending Tasks</h1>
        {/* <button>Save</button> */}
      </div>
      <div className={styles.gap}></div>
      <div className={length === 0 ? styles.hide : styles.topRight}>
        {/* <button>Mark as Done</button> */}
        <div className={styles.sorting}>
          <span
            className="material-symbols-outlined"
            style={{
              color: "rgba(245,245,245,.5)",
              fontSize: "22px",
            }}
          >
            sort
          </span>
          <div className={styles.sortRight}>
            <select
              name="sort"
              id="sort"
              defaultValue="default"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default" disabled>
                Sort By
              </option>
              <option value="date">Date</option>
              <option value="priority">Priority</option>
            </select>
            <button className={styles.order} onClick={handleClick}>
              <span
                className="material-symbols-outlined"
                style={{
                  color: "rgba(245,245,245,.5)",
                  fontWeight: "300",
                  fontSize: "20px",
                }}
              >
                swap_vert
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className={length === 0 ? styles.banner : styles.hide}>
        <img src="https://img.icons8.com/sf-ultralight/120/f5f5f5/sleep.png" />
        <h1>You don’t have any active tasks...</h1>
        <Link href="/form">
          <button>Add a Task</button>
        </Link>
      </div>
      <div className={styles.container}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.attributes.title}
            description={task.attributes.description}
            date={task.attributes.date}
            priority={task.attributes.priority}
            time={task.attributes.time}
            uid={task.attributes.uid}
            category={task.attributes.category}
            createdAt={task.attributes.createdAt}
            userId={task.attributes.userId}
          />
        ))}
        <Link href="/form" className={length === 0 ? styles.hide : ""}>
          <div className={styles.addTask}>
            <button
              style={{
                cursor: "pointer",
              }}
            >
              <h1>+</h1>
            </button>
            <h1>Add a Task</h1>
          </div>
        </Link>
      </div>
      <div className={styles.spacing2}></div>
      <div
        className={
          length === 0 && completedLength === 0 && deletedLength === 0
            ? styles.hide
            : ""
        }
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              color: "#f5f5f5",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            check_circle
          </span>
          <h1>Completed Tasks</h1>
          {/* <button>Save</button> */}
        </div>
        <div className={styles.spacing}></div>
        <div className={completedLength === 0 ? styles.banner2 : styles.hide}>
          <img src="https://img.icons8.com/windows/96/f5f5f5/empty-box.png" />
          <h1>You haven't completed any tasks yet...</h1>
        </div>
        <div className={styles.container}>
          {completedTasks.slice(0, displayCount).map((completed) => (
            <Completed
              key={completed.id}
              title={completed.attributes.title}
              description={completed.attributes.description}
              date={completed.attributes.date}
              time={completed.attributes.time}
              priority={completed.attributes.priority}
              category={completed.attributes.category}
              createdAt={completed.attributes.createdAt}
              userId={completed.attributes.userId}
            />
          ))}
          {completedTasks.length > displayCount && (
            <h1
              style={{
                marginTop: "25px",
                fontSize: "16px",
                fontWeight: "500",
                textAlign: "center",
                textDecoration: "underline",
                color: "#ff69b4",
                cursor: "pointer",
              }}
              onClick={handleDisplayCount}
            >
              Show more
            </h1>
          )}
        </div>
        <div className={styles.spacing2}></div>
        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              color: "#f5f5f5",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            cancel
          </span>
          <h1>Incomplete Tasks</h1>
          {/* <button>Save</button> */}
        </div>
        <div className={styles.spacing}></div>
        <div className={deletedLength === 0 ? styles.banner2 : styles.hide}>
          <img src="https://img.icons8.com/windows/96/f5f5f5/laugh-beam.png" />
          <h1>You don't have any incomplete tasks!</h1>
        </div>
        <div className={styles.container}>
          {deletedTasks.slice(0, displayCount).map((deleted) => (
            <Deleted
              key={deleted.id}
              title={deleted.attributes.title}
              description={deleted.attributes.description}
              date={deleted.attributes.date}
              time={deleted.attributes.time}
              priority={deleted.attributes.priority}
              uid={deleted.attributes.uid}
              category={deleted.attributes.category}
              createdAt={deleted.attributes.createdAt}
              userId={deleted.attributes.userId}
            />
          ))}
          {deletedTasks.length > displayCount && (
            <h1
              style={{
                marginTop: "25px",
                fontSize: "16px",
                fontWeight: "500",
                textAlign: "center",
                textDecoration: "underline",
                color: "#ff69b4",
                cursor: "pointer",
              }}
              onClick={handleDisplayCount}
            >
              Show more
            </h1>
          )}
        </div>
        <div className={styles.spacing}></div>
      </div>
    </div>
  );
};

export default CategoryContent;
