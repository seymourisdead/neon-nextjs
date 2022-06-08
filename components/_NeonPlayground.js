import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-sql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

const NeonPlayground = () => {
  const editorRef = React.useRef(null);
  const [result, setResult] = React.useState();

  const run = React.useCallback(async () => {
    // debugger;
    const query = editorRef.current.editor.getValue();
    fetch("api/run", { body: query, method: "POST" }).then(res => res.json()).then(setResult);
  }, [editorRef]);

  return (
    <div>
      <p>
        Run queries on your cluster directly from this sandbox!
      </p>
      <AceEditor
        mode={'sql'}
        theme={"github"}
        ref={editorRef}
        height={'200px'}
        defaultValue={"select 1;"}
      />
      <br />
      <button
        onClick={run}
      >Run</button>

      <p>
        Results:
      </p>
      <AceEditor
        mode={'json'}
        theme={"github"}
        value={JSON.stringify(result, null, 2)}
        readOnly={true}
        height={'200px'}
      />
    </div>
  )
}

export default NeonPlayground;