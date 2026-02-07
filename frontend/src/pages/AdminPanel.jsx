import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function AdminPanel() {

  const [active, setActive] = useState("dashboard");

  const [candidates, setCandidates] = useState([]);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [linkedinUrl, setLinkedin] = useState("");


  useEffect(()=>{
    loadCandidates();
  },[]);


  const loadCandidates = ()=>{
    fetch("http://localhost:5000/api/admin/candidates")
    .then(res=>res.json())
    .then(data=>setCandidates(data));
  };


  const addCandidate = async ()=>{

    await fetch("http://localhost:5000/api/admin/candidate",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        image,
        linkedinUrl
      })
    });

    alert("Candidate Added");

    loadCandidates();
  };


  const deleteCandidate = async(id)=>{

    await fetch(
      `http://localhost:5000/api/admin/candidate/${id}`,
      {method:"DELETE"}
    );

    alert("Candidate Deleted");

    loadCandidates();
  };


  // ✅ RESET VOTES FUNCTION
  const resetVotes = async ()=>{

    if (!window.confirm("Are you sure to reset all votes?")) return;

    await fetch(
      "http://localhost:5000/api/admin/reset",
      {
        method:"POST"
      }
    );

    alert("All votes reset");

    loadCandidates();
  };


  return (

    <AdminLayout active={active} setActive={setActive}>

      {/* DASHBOARD */}
      {active==="dashboard" && (

        <div>

          <h1>Dashboard</h1>

          <div style={styles.card}>

            <h3>Add Candidate</h3>

            <input
              placeholder="Name"
              style={styles.input}
              onChange={(e)=>setName(e.target.value)}
            />

            <input
              placeholder="Image URL"
              style={styles.input}
              onChange={(e)=>setImage(e.target.value)}
            />

            <input
              placeholder="LinkedIn URL"
              style={styles.input}
              onChange={(e)=>setLinkedin(e.target.value)}
            />

            <button
              style={styles.addBtn}
              onClick={addCandidate}
            >
              Add Candidate
            </button>


            {/* RESET BUTTON */}
            <button
              style={styles.resetBtn}
              onClick={resetVotes}
            >
              Reset All Votes
            </button>

          </div>

        </div>

      )}



      {/* CANDIDATES */}
      {active==="candidates" && (

        <div>

          <h1>Candidates</h1>

          <div style={styles.grid}>

            {candidates.map(candidate=>(

              <div key={candidate._id} style={styles.candidateCard}>

                <img
                  src={candidate.image}
                  style={styles.image}
                />

                <h3>{candidate.name}</h3>

                <p>Votes: {candidate.voteCount}</p>

                <button
                  style={styles.deleteBtn}
                  onClick={()=>deleteCandidate(candidate._id)}
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      )}



      {/* RESULTS */}
      {active==="results" && (

        <div>

          <h1>Results</h1>

          {candidates.map(candidate=>(

            <div key={candidate._id} style={styles.resultItem}>

              {candidate.name} : {candidate.voteCount} votes

            </div>

          ))}

        </div>

      )}

    </AdminLayout>

  );

}



const styles={

  card:{
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    width:"300px"
  },

  input:{
    width:"100%",
    padding:"8px",
    margin:"5px 0"
  },

  addBtn:{
    width:"100%",
    padding:"10px",
    background:"#4CAF50",
    color:"white",
    border:"none",
    marginBottom:"10px"
  },

  resetBtn:{
    width:"100%",
    padding:"10px",
    background:"red",
    color:"white",
    border:"none"
  },

  grid:{
    display:"flex",
    gap:"20px",
    flexWrap:"wrap"
  },

  candidateCard:{
    background:"white",
    padding:"20px",
    borderRadius:"10px",
    width:"200px"
  },

  image:{
    width:"100%"
  },

  deleteBtn:{
    width:"100%",
    padding:"10px",
    background:"red",
    color:"white",
    border:"none"
  },

  resultItem:{
    background:"white",
    padding:"10px",
    margin:"10px",
    borderRadius:"5px"
  }

};
