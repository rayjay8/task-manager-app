import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../../styles/components/Task.module.css";

const Task = ({
  id,
  title,
  description,
  date,
  time,
  priority,
  uid,
  category,
  createdAt,
  userId,
}) => {
  const currentDate = new Date();
  const taskDate = new Date(date + "T" + time);
  const twelveHourTime = taskDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const daysDiff = Math.abs(
    Math.floor((taskDate - currentDate) / (1000 * 60 * 60 * 24))
  );
  const hoursDiff = Math.abs(
    Math.floor((taskDate - currentDate) / (1000 * 60 * 60)) - daysDiff * 24
  );
  const minutesDiff =
    Math.floor((taskDate - currentDate) / (1000 * 60)) - hoursDiff * 60;

  let formattedDate = "";
  let timeLeft = "";

  if (daysDiff >= 1) {
    timeLeft = daysDiff + " days " + hoursDiff + "h";
  } else {
    if (hoursDiff === 0) {
      timeLeft = minutesDiff + " minutes";
      if (minutesDiff === 0) {
        timeLeft = "Due now";
      }
    } else {
      timeLeft = hoursDiff + " hours " + minutesDiff + "m";
    }
  }
  if (minutesDiff < 0) {
    timeLeft = 0;
  }

  if (currentDate.getDate() === taskDate.getDate()) {
    formattedDate = twelveHourTime;
  } else if (daysDiff < 7) {
    formattedDate = taskDate.toLocaleString("en-US", {
      weekday: "short",
    });
  } else {
    formattedDate = taskDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const deleteTask = () => {
    fetch("http://192.168.29.217:1337/api/tasks/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    window.location.reload();
  };

  const markAsDone = (e) => {
    setIsDone(!isDone);
    e.stopPropagation();
    const task = {
      title,
      description,
      date,
      time,
      priority,
      category,
      userId,
    };
    fetch("http://192.168.29.217:1337/api/completed-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        console.log(userId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    deleteTask();
    window.location.reload();
  };

  useEffect(() => {
    if (timeLeft === 0) {
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
      fetch("http://192.168.29.217:1337/api/deleted", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: task }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error(error);
        });
      deleteTask();
    }
  }, [timeLeft]);

  const priorityColor = () => {
    if (priority === "c") {
      return "#ff3e21";
    } else if (priority === "b") {
      return "#ffa07a";
    } else {
      return "#50c878";
    }
  };

  const priorityName = () => {
    if (priority === "c") {
      return "High";
    } else if (priority === "b") {
      return "Medium";
    } else {
      return "Low";
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className={`${styles.task} ${isExpanded ? styles.shadow : ""}`}
          onClick={toggle}
        >
          <div className={styles.container}>
            <div
              className={isDone ? styles.checked : styles.check}
              onClick={markAsDone}
            >
              {isDone && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 26 26"
                >
                  <path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"></path>
                </svg>
              )}
            </div>
            <div className={styles.subContainer}>
              <h1>{title}</h1>
              <h2>
                <span className={date}>{formattedDate}</span>{" "}
                <span className={category === "None" ? styles.none : ""}>
                  <span
                    style={{
                      color: "#f5f5f5",
                    }}
                  >
                    ·
                  </span>{" "}
                  {category}
                </span>
              </h2>
            </div>
          </div>
          <div className={styles.topRight}>
            <div
              className={priorityColor()}
              style={{
                backgroundColor: priorityColor(),
                height: "8px",
                width: "8px",
                borderRadius: "50%",
              }}
            ></div>
            <div className={isExpanded ? styles.flip : styles.icon}>
              <img src="https://img.icons8.com/external-tanah-basah-glyph-tanah-basah/48/f5f5f5/external-Down-arrows-tanah-basah-glyph-tanah-basah-5.png" />
            </div>
          </div>
        </div>
        <div className={isExpanded ? styles.expand : styles.hide}>
          <p>{description === "" ? "// no description" : description}</p>
          <div className={styles.bottom}>
            <h1
              style={{
                visibility: "visible",
              }}
            >
              Time left: <span> {timeLeft} </span>
            </h1>
            <div className={styles.right}>
              <Link href="/edit/[id]" as={`/edit/${id}`}>
                <button className={styles.rightBtn}>
                  <img src="https://img.icons8.com/ios-glyphs/20/e3e3e3/pencil--v1.png" />
                  <h1>Edit</h1>
                </button>
              </Link>
              <button className={styles.rightBtn} onClick={markAsDone}>
                <img src="https://img.icons8.com/ios-glyphs/20/e3e3e3/checked-checkbox.png" />
                <h1 onClick={markAsDone}>Mark as done</h1>
              </button>
              <button className={styles.deleteBtn} onClick={deleteTask}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
