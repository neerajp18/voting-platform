import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Voters() {

  const [voters, setVoters] = useState([]);

  useEffect(()=>{

    fetch("https://voting-platform.onrender.com/api/vote/voters")
      .then(res=>res.json())
      .then(data=>setVoters(data));

  },[]);


  return (

    <>
      <Navbar />

      <div style={styles.container}>

        <h1>Voters List</h1>

        {voters.map((voter,index)=>(

          <div key={index} style={styles.card}>

            <h3>{voter.name}</h3>

            <p>
              Voted for: {voter.candidate?.name}
            </p>


            {/* LinkedIn link */}
            {voter.candidate?.linkedinUrl && (

              <a
                href={voter.candidate.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.linkedinLink}
              >
                View Candidate LinkedIn Profile
              </a>

            )}

          </div>

        ))}

      </div>

    </>
  );

}


const styles = {

  container:{
    paddingTop:"80px",
    textAlign:"center",
    minHeight:"100vh",
    background:"#f4f6f8"
  },

  card:{
    background:"white",
    width:"350px",
    margin:"20px auto",
    padding:"20px",
    borderRadius:"10px",
    boxShadow:"0 4px 15px rgba(0,0,0,0.1)"
  },

  linkedinLink:{
    display:"block",
    marginTop:"10px",
    color:"#0A66C2",
    fontWeight:"bold",
    textDecoration:"none"
  }

};
