import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import RenderLogs from "../components/logs/RenderLogs";
import { fetchLogs } from "../services/apiCalls/userLogs/fetchLogs";

function MyLogs() {
  const { user, id } = useUser();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  var User = user ? user.charAt(0).toUpperCase() + user.slice(1) : null;
  useEffect(() => {
    if (id) {
      getLogs(id);
    }
  }, [id]);

  async function getLogs(id) {
    try {
      setLoading(true);
      const data = await fetchLogs(id);

      if (data) {
        setLogs(data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  }
  return (
    <>
      <h1>Here is your log history, {User}!</h1>
      {loading ? <>Loading logs...</> : <RenderLogs logs={logs} />}
    </>
  );
}
export default MyLogs;
