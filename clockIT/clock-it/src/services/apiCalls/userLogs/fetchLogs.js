import { requestNewAccessToken } from "../auth/requestNewAccessToken";

export async function fetchLogs(id) {
  try {
    const response = await fetch(`https://localhost:5000/myLogs?id=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 403) {
      return await requestNewAccessToken(fetchLogs, id);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch logs");
    }

    const data = await response.json();
    if (data) {
      return data.data;
    }
  } catch (err) {
    console.error("Error fetching logs:", err);
  }
}

export async function fetchLastLogs(id) {
  try {
    const response = await fetch(`https://localhost:5000/myLastLogs?id=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 403) {
      return await requestNewAccessToken(fetchLastLogs, id);
    }
    if (!response.ok) {
      throw new Error("Failed to fetch lastLogs");
    }

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error("Error fetching lastLogs:", err);
  }
}
