import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext.jsx";
import LastLogs from "../components/logs/LastLogs.jsx";
import ClockIT from "../components/clockIT/ClockIT.jsx";
import { fetchLastLogs } from "../services/apiCalls/userLogs/fetchLogs.js";

function Home() {
  const { user, id } = useUser();
  const [lastLogs, setLastLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  var User = user ? user.charAt(0).toUpperCase() + user.slice(1) : null;

  useEffect(() => {
    if (id) {
      getLastLogs();
    }
  }, [id]);

  const getLastLogs = async () => {
    if (id) {
      setLoading(true);

      try {
        const data = await fetchLastLogs(id);
        if (data && data !== lastLogs) {
          setLastLogs(data);
        }
      } catch (error) {
        alert("Failed to fetch logs. ", error.message);
      } finally {
        setLoading(false);
      }
    }
    return;
  };

  return (
    <>
      <h1>Welcome Home, {User}!</h1>

      <ClockIT setLastLogs={setLastLogs} />

      {loading ? (
        <>Loading logs...</>
      ) : (
        <LastLogs lastLogs={lastLogs} fetchLastLogs={getLastLogs} />
      )}
    </>
  );
}

export default Home;
