import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "../../styles/components/Pie.module.css";

const DoughnutChart = ({
  completed,
  incomplete,
  pending,
  successRate,
  total,
}) => {
  const data = {
    datasets: [
      {
        data: [completed, incomplete, pending],
        backgroundColor: ["#0aad4b", "#ff3e21", "#b3b3b3"],
        hoverBackgroundColor: ["#0aad4b", "#ff3e21", "#b3b3b3"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    tooltips: {
      displayColors: false,
      caretSize: 0,
    },
  };

  return (
    <div className={styles.pie}>
      <div className={styles.completion}>
        <h1>
          Completion <br /> <span>Rate</span>
        </h1>
        <h1>{successRate}%</h1>
      </div>
      <Doughnut data={data} options={options} className={styles.doughnut} />
      <div>
        <ul>
          <li>
            <span
              style={{
                color: "#0aad4b",
              }}
            >
              Completed
            </span>
          </li>
          <li>
            <span
              style={{
                color: "#ff3e21",
              }}
            >
              Failed
            </span>
          </li>
          <li>
            <span
              style={{
                color: "#b3b3b3",
              }}
            >
              Pending
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DoughnutChart;
