import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Results() {

  const [candidates, setCandidates] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/api/vote/results")
      .then(res => res.json())
      .then(data => {

        setCandidates(data.candidates);
        setWinner(data.winner);

      });

  }, []);

  const chartData = {

    labels: candidates.map(c => c.name),

    datasets: [
      {
        label: "Votes",
        data: candidates.map(c => c.voteCount),
        backgroundColor: "#667eea",
      }
    ]

  };

  return (

    <>
      <Navbar />

      <div style={styles.container}>

        <h1>Voting Results</h1>

        {winner && (

          <div style={styles.winnerCard}>

            <h2>🏆 Winner</h2>

            <img
              src={winner.image}
              style={styles.image}
            />

            <h3>{winner.name}</h3>

            <p>Total Votes: {winner.voteCount}</p>

          </div>

        )}

        <div style={styles.chartContainer}>

          <Bar data={chartData} />

        </div>

      </div>

    </>

  );

}

const styles = {

  container: {
    textAlign: "center",
    padding: "30px",
  },

  winnerCard: {
    margin: "20px auto",
    padding: "20px",
    width: "300px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
  },

  chartContainer: {
    width: "600px",
    margin: "40px auto",
  }

};
