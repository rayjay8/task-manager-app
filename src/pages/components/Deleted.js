import React, { useState, useEffect } from "react";
import styles from "../../styles/components/Deleted.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Deleted = ({
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div
      style={{
        opacity: 0.6,
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
                <path d="M 6.65625 4 C 6.367188 4 6.105469 4.113281 5.90625 4.3125 L 4.3125 5.90625 C 3.914063 6.304688 3.914063 7 4.3125 7.5 L 9.8125 13 L 4.3125 18.5 C 3.914063 19 3.914063 19.695313 4.3125 20.09375 L 5.90625 21.6875 C 6.40625 22.085938 7.101563 22.085938 7.5 21.6875 L 13 16.1875 L 18.5 21.6875 C 19 22.085938 19.695313 22.085938 20.09375 21.6875 L 21.6875 20.09375 C 22.085938 19.59375 22.085938 18.898438 21.6875 18.5 L 16.1875 13 L 21.6875 7.5 C 22.085938 7 22.085938 6.304688 21.6875 5.90625 L 20.09375 4.3125 C 19.59375 3.914063 18.898438 3.914063 18.5 4.3125 L 13 9.8125 L 7.5 4.3125 C 7.25 4.113281 6.945313 4 6.65625 4 Z"></path>
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
        </div>
      </div>
    </div>
  );
};

export default Deleted;
