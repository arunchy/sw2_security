export function clearAllCookies() {
    // Get all cookies
    const cookies = document.cookie.split(";");
  
    // Loop through each cookie and delete it
    cookies.forEach(cookie => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  }
  
 