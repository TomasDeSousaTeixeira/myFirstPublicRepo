export async function registerUser(userData){
    try {
        const response = await fetch('https://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
       
        if (!response.ok) {
           throw new Error(`Registration failed: ${response.statusText}`);
        }
      return response
      } catch (error) {
        console.log("Registration failed: ", error);
        throw error
      }

}