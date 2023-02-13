import React, { useEffect, useState } from "react";
import styles from "../../styles/components/Charts.module.css";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import DoughChart from "./Pie";
import LineChart from "./LineChart";
import { AuthContext, useFetchUserId } from "../../context/AuthContext";
import { unsetToken } from "../../auth";

const Charts = () => {
  let [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [incomplete, setIncomplete] = useState(0);

  const { user, id } = useFetchUserId();

  const [created, setCreated] = useState([]);
  const [updated, setUpdated] = useState([]);
  const [deleted, setDeleted] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(
        "http://192.168.29.217:1337/api/tasks" + "?filters[userId][$eq]=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setPending(data.data.length);
          setCreated(data.data.map((task) => task.attributes.createdAt));
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(
        "http://192.168.29.217:1337/api/completed-tasks" +
          "?filters[userId][$eq]=" +
          id
      )
        .then((response) => response.json())
        .then((data) => {
          setCompleted(data.data.length);
          setUpdated(data.data.map((task) => task.attributes.createdAt));
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetch(
        "http://192.168.29.217:1337/api/deleted" + "?filters[userId][$eq]=" + id
      )
        .then((response) => response.json())
        .then((data) => {
          setIncomplete(data.data.length);
          setDeleted(data.data.map((task) => task.attributes.createdAt));
        });
    }
  }, [id]);

  const total = completed + incomplete + pending;
  const successRate = Math.round((completed / total) * 100);

  return (
    <div className={styles.charts}>
      <h1>Statistics</h1>
      <div
        style={{
          marginTop: "30px",
        }}
      ></div>
      <div className={styles.data}>
        <div className={styles.totalCard}>
          <h1
            style={{
              fontSize: "1.8rem",
            }}
          >
            Total <br /> <span>Tasks</span>
          </h1>
          <h1
            style={{
              fontSize: "4rem",
            }}
          >
            {" "}
            {total}{" "}
          </h1>
        </div>
        <DoughChart
          completed={completed}
          incomplete={incomplete}
          pending={pending}
          successRate={successRate}
          total={total}
        />
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      ></div>
      <div className={styles.data}>
        <div className={styles.card}>
          <h1>
            Pending <br /> <span>Tasks</span>
          </h1>
          <h1> {pending} </h1>
        </div>
        <div className={styles.card}>
          <h1>
            Completed <br /> <span>Tasks</span>
          </h1>
          <h1> {completed} </h1>
        </div>
        <div className={styles.card}>
          <h1>
            Incomplete <br /> <span>Tasks</span>
          </h1>
          <h1> {incomplete} </h1>
        </div>
      </div>
      <div
        style={{
          marginTop: "20px",
        }}
      ></div>
      <LineChart deleted={deleted} />
    </div>
  );
};

export default Charts;
