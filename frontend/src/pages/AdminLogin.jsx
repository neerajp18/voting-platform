import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {

    if (username === "admin" && password === "admin123") {

      localStorage.setItem("admin", "true");

      navigate("/admin");

    } else {

      alert("Invalid admin credentials");

    }

  };

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Admin Login
        </h1>

        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          style={styles.loginBtn}
          onClick={login}
        >
          Login
        </button>

      </div>

    </div>

  );

}

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  card: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "300px",
  },

  title: {
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  loginBtn: {
    width: "100%",
    padding: "12px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
  },

};
