import React, { useState } from "react";
import axios from "axios";

function App() {
  const [doctor, setDoctor] = useState("");
  const [notes, setNotes] = useState("");
  const [response, setResponse] = useState("");

  const logInteraction = async () => {
    const res = await axios.post("http://127.0.0.1:8000/log-interaction", {
      doctor_name: doctor,
      notes: notes
    });
    setResponse(JSON.stringify(res.data));
  };

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      
      {/* LEFT FORM */}
      <div style={{ width: "50%" }}>
        <h2>Log Interaction</h2>

        <input
          placeholder="Doctor Name"
          onChange={(e) => setDoctor(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Notes"
          onChange={(e) => setNotes(e.target.value)}
        />
        <br /><br />

        <button onClick={logInteraction}>Submit</button>
      </div>

      {/* RIGHT AI */}
      <div style={{ width: "50%", marginLeft: "20px" }}>
        <h2>AI Output</h2>
        <pre>{response}</pre>
      </div>

    </div>
  );
}

export default App;