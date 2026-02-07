import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("userId");

    navigate("/");

  };

  return (

    <div style={styles.navbar}>

      {/* Logo */}
      <h2 style={styles.logo}>
        Voting Platform
      </h2>

      {/* Navigation buttons */}
      <div style={styles.navGroup}>

        <button
          style={styles.navBtn}
          onClick={() => navigate("/candidates")}
        >
          Candidates
        </button>

        <button
          style={styles.navBtn}
          onClick={() => navigate("/voters")}
        >
          Voters
        </button>

        <button
          style={styles.navBtn}
          onClick={() => navigate("/results")}
        >
          Results
        </button>

        {/* NEW ADMIN PANEL BUTTON */}
        <button
          style={styles.adminBtn}
          onClick={() => navigate("/admin")}
        >
          Admin Panel
        </button>

        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );

}

const styles = {

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    color: "white",
  },

  logo: {
    margin: 0,
  },

  navGroup: {
    display: "flex",
    gap: "10px",
  },

  navBtn: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#e0e0e0",
  },

  adminBtn: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#ff9800",
    color: "white",
    fontWeight: "bold",
  },

  logoutBtn: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    background: "#ff0000",
    color: "white",
  },

};
