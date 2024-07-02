

import {  showErrorToast } from '../utils/toastUtils';


export const requestHandler = async (apiCall, setLoading, onSuccess, ) => {

    setLoading && setLoading(true);

    try {
        const response = await apiCall();
        // const { data } = response;
        if (response?.success) {
            // Call the onSuccess callback with the response data
            // console.log(response);
            onSuccess(response);
        }
    } catch (error) {
      showErrorToast(error?.response?.data?.error || "Something went wwwwwwrong");
        // Handle error cases, including unauthorized and forbidden cases
        
        if ([401,403].includes(error?.response?.status) && error?.response?.data?.error !== "Incorrect password") {
          // Redirect to login page
          showErrorToast("Please Wait,\n Redirecting to Login Page...");
         setTimeout(() => {
          if (isBrowser)  window.location.replace('/login') 
          }, 4500);
          
        }
        
        // console.log(error); 
        
      }
    finally {
            setLoading && setLoading(false);
        }
    };

    // Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";



