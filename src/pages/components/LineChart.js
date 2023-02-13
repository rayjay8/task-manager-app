import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js";
import { AuthContext, useFetchUserId } from "../../context/AuthContext";
import { unsetToken } from "../../auth";

const LineChart = () => {
  const [data, setData] = useState([]);

  const { id } = useFetchUserId();

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(
      "http://192.168.29.217:1337/api/completed-tasks" +
        "?filters[userId][$eq]=" +
        id
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      });
  }, [id]);

  const createdAtData = data.map((item) => item.attributes.createdAt);
  const formattedDates = createdAtData.map((item) => {
    const date = new Date(item);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  });
  // count the number of times each date appears in the array
  const count = formattedDates.reduce((acc, curr) => {
    if (typeof acc[curr] == "undefined") {
      acc[curr] = 1;
    } else {
      acc[curr] += 1;
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(count),
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    datasets: [
      {
        label: "Completed Tasks",
        data: Object.values(count),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        fill: true,
        lineTension: 0.1,
        // backgroundColor: "#ff69b4",
        borderColor: "#ff69b4",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#ff69b4",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#ff69b4",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        // max: Math.max(...Object.values(count)) + 1,
      },
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    // animation: false,
  };

  return (
    <div style={{ width: "100%", height: "70%", paddingTop: "50px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
