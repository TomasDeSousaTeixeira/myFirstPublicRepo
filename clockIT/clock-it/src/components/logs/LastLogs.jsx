import React from "react";
import RenderLogs from "./RenderLogs";
import RefreshLastLogsButton from "../buttons/RefreshLastLogs";
import GetLogsButton from "../buttons/GetLogs";

function LastLogs({ lastLogs, fetchLastLogs }) {
  return (
    <>
      {lastLogs.length > 0 && (
        <>
          <RenderLogs logs={lastLogs} />
          <RefreshLastLogsButton fetchLastLogs={fetchLastLogs} />
          <GetLogsButton/>
        </>
      )}
    </>
  );
}

export default LastLogs;
