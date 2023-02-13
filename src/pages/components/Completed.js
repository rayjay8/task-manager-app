import React, { useState, useEffect } from "react";
import styles from "../../styles/components/Completed.module.css";

const Completed = ({
  id,
  title,
  description,
  date,
  time,
  priority,
  category,
  createdAt,
  userId,
}) => {
  const currentDate = new Date();
  const taskDate = new Date(date);
  const taskTime = new Date("2023-01-30T" + time);
  const twelveHourTime = taskTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const daysDiff = Math.abs(
    Math.floor((taskDate - currentDate) / (1000 * 60 * 60 * 24))
  );
  let formattedDate = taskDate.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

  const completedAt = new Date(createdAt);
  const completedDate = completedAt.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });
  const completedTime = completedAt.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  const priorityColor = () => {
    if (priority === "c") {
      return "#ff3e21";
    } else if (priority === "b") {
      return "#ffa07a";
    } else {
      return "#50c878";
    }
  };

  return (
    <div
      style={{
        opacity: 0.7,
      }}
    >
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
            <div className={styles.checked}>
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
            <h1>
              Completed {completedDate === formattedDate ? "at" : "on"} :{" "}
              <span>
                {" "}
                {completedDate === formattedDate
                  ? completedTime
                  : completedDate}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
