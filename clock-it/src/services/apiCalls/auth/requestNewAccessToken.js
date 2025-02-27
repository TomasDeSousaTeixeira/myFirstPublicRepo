const redirectToLogin = () => {
    window.location.href = "/"; 
  };

export const requestNewAccessToken = async (apiCallFunction, ...args) => {
    try {
        const refreshResponse = await fetch("https://localhost:5000/refresh-token", {
        method: "POST",
        credentials: "include",
      });
  
      if (refreshResponse.ok) {
        // Retry the original API call
        return await apiCallFunction(...args);
      } else {
        // Refresh failed, redirect to login
        alert("Failed to refresh access token");
        redirectToLogin();
      }
    } catch (error) {
      alert("Failed to refresh access token");
      redirectToLogin();
    }
  };