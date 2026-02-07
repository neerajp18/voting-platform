import { useNavigate } from "react-router-dom";

export default function AdminLayout({ children, active, setActive }) {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("admin");

    navigate("/admin-login");

  };

  return (

    <div style={styles.container}>

      {/* Sidebar */}
      <div style={styles.sidebar}>

        <h2>Admin Panel</h2>

        <button
          style={active==="dashboard" ? styles.activeBtn : styles.menuBtn}
          onClick={()=>setActive("dashboard")}
        >
          Dashboard
        </button>

        <button
          style={active==="candidates" ? styles.activeBtn : styles.menuBtn}
          onClick={()=>setActive("candidates")}
        >
          Candidates
        </button>

        <button
          style={active==="results" ? styles.activeBtn : styles.menuBtn}
          onClick={()=>setActive("results")}
        >
          Results
        </button>

        <button
          style={styles.logoutBtn}
          onClick={logout}
        >
          Logout
        </button>

      </div>

      {/* Content */}
      <div style={styles.content}>
        {children}
      </div>

    </div>

  );

}

const styles = {

  container:{
    display:"flex",
    minHeight:"100vh"
  },

  sidebar:{
    width:"250px",
    background:"#1e293b",
    color:"white",
    padding:"20px",
    display:"flex",
    flexDirection:"column"
  },

  menuBtn:{
    padding:"12px",
    marginBottom:"10px",
    background:"transparent",
    border:"none",
    color:"white",
    textAlign:"left",
    cursor:"pointer"
  },

  activeBtn:{
    padding:"12px",
    marginBottom:"10px",
    background:"#4CAF50",
    border:"none",
    color:"white",
    textAlign:"left",
    cursor:"pointer"
  },

  logoutBtn:{
    marginTop:"auto",
    padding:"12px",
    background:"red",
    border:"none",
    color:"white"
  },

  content:{
    flex:1,
    padding:"30px",
    background:"#f1f5f9"
  }

};
