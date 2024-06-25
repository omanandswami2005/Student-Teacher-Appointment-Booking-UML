export const requestHandler = async (apiCall, setLoading, onSuccess, onError) => {

    setLoading && setLoading(true);

    try {
        const response = await apiCall();
        // const { data } = response;
        if (response?.success) {
            // Call the onSuccess callback with the response data
            console.log(response);
            onSuccess(response);
        }
    } catch (error) {
        // Handle error cases, including unauthorized and forbidden cases
        if ([401, 403].includes(error?.response.data?.statusCode)) {
            localStorage.clear(); // Clear local storage on authentication issues
          if (isBrowser)  window.location.href = "/login"; // Redirect to login page
        }
    console.log(error);
        onError(error?.response?.data?.error || "Something went wrong");}
    finally {
            setLoading && setLoading(false);
        }
    };

    // Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";



// A class that provides utility functions for working with local storage
export class LocalStorage {
    // Get a value from local storage by key
    static get(key) {
      if (!isBrowser) return;
      const value = localStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch (err) {
          return null;
        }
      }
      return null;
    }
  
    // Set a value in local storage by key
    static set(key, value) {
      if (!isBrowser) return;
      localStorage.setItem(key, JSON.stringify(value));
    }
  
    // Remove a value from local storage by key
    static remove(key) {
      if (!isBrowser) return;
      localStorage.removeItem(key);
    }
  
    // Clear all items from local storage
    static clear() {
      if (!isBrowser) return;
      localStorage.clear();
    }
  }