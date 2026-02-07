import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Candidates() {

  const [candidates, setCandidates] = useState([]);
  const location = useLocation();

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    if (userId) {
      localStorage.setItem("userId", userId);
    }

    fetch("https://voting-platform.onrender.com/api/candidates")
      .then(res => res.json())
      .then(data => setCandidates(data));

  }, [location.search]);

  const vote = async (candidateId) => {

    const userId = localStorage.getItem("userId");

    const res = await fetch("https://voting-platform.onrender.com/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, candidateId })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Vote successful");

    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div style={styles.container}>

        <h1>Choose Your Candidate</h1>

        <div style={styles.grid}>

          {candidates.map(candidate => (

            <div key={candidate._id} style={styles.card}>

              <img
                src={candidate.image}
                alt={candidate.name}
                style={styles.image}
              />

              <h3>{candidate.name}</h3>

              {/* Vote count */}
              <p style={styles.voteCount}>
                Votes: {candidate.voteCount || 0}
              </p>

              <a
                href={candidate.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                View LinkedIn
              </a>

              <button
                style={styles.voteBtn}
                onClick={() => vote(candidate._id)}
              >
                Vote
              </button>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}

const styles = {

  container: {
    paddingTop: "80px",
    textAlign: "center",
  },

  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginTop: "30px",
  },

  card: {
    padding: "20px",
    width: "250px",
    borderRadius: "12px",
    background: "white",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    animation: "fadeIn 0.5s ease",
  },

  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
  },

  voteCount: {
    fontWeight: "bold",
    color: "#667eea",
  },

  voteBtn: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

};
