import React from "react";

export default function RefreshLastLogsButton({fetchLastLogs}) {
  return (
    <button onClick={()=> fetchLastLogs()}>🔄</button>
  );
}
