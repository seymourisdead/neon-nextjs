import React, {useState, useRef} from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";

const NeonPlayground = () => {
  const editorRef = useRef(null);
  const [connectionString, setConnectionString] = useState(() => {
    return sessionStorage.getItem('connectionString') || '';
  });

  const [result, setResult] = useState();

  const run = async () => {
    const query = editorRef.current.editor.getValue();
    await fetch("/api/run", { body: JSON.stringify({ connectionString, query }), method: "POST" })
      .then(res => res.json())
      .then(setResult);
  }

  const handleConnectionChange = (connection) => {
    setConnectionString(connection);
    sessionStorage.setItem('connectionString', connection);
  }

  return (
    <div>
        <label>Step 1: Enter Postgres Connection String</label>
        <input style={{width:'100%', height:'50px'}} required onChange={(e) => {handleConnectionChange(e.target.value)}} type="text" name="connectionString" placeholder='Connection string...' value={connectionString} /> 


      <p>
        Step 2: Run queries on your cluster directly from this sandbox!
      </p>
      <AceEditor
        mode={'sql'}
        theme={"monokai"}
        ref={editorRef}
        height={'200px'}
        defaultValue={"select 1;"}
      />
      <br />
      <button
        onClick={run}
      >Run</button>

      <p>
        Step 3: View Results:
      </p>
      <AceEditor
        mode={'json'}
        theme={"monokai"}
        value={JSON.stringify(result, null, 2)}
        readOnly={true}
        height={'400px'}
      />
    </div>
  )
}

export default NeonPlayground;