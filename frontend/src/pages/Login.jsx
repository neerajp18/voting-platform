export default function Login() {
  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Voting Platform
        </h1>

        <p style={styles.subtitle}>
          Login to cast your vote
        </p>

        <a href="https://voting-platform.onrender.com/auth/google">
          <button style={styles.googleBtn}>
            Login with Google
          </button>
        </a>

        <br /><br />

        <a href="https://voting-platform.onrender.com/auth/linkedin">
          <button style={styles.linkedinBtn}>
            Login with LinkedIn
          </button>
        </a>

      </div>

    </div>
  );
}

const styles = {

  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },

  card: {
    background: "white",
    padding: "50px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.2)",
    width: "400px",
  },

  title: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#333",
  },

  subtitle: {
    marginBottom: "30px",
    color: "#666",
  },

  googleBtn: {
    padding: "12px",
    background: "#db4437",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },

  linkedinBtn: {
    padding: "12px",
    background: "#0077b5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },

};
