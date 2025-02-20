import React from "react";

function RenderLogs({logs}) {
    return logs.length === 0 ? (
      <p>You have no logs yet!</p>
    ) : (
      <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.date.substring(0,10)}</td>
              <td>{log.time.substring(0,8)}</td>
              <td>{log.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      </>

    );
  }

  export default RenderLogs;