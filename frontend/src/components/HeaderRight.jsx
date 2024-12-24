// HeaderRight.js
// const HeaderRight = () => {
//     return (
//       <div className="header-right">
//         <div className="block-signin">
//           {/* <a href="/signup" className="text-link-bd-btom hover-up mr-40">Sign Up</a> */}
//           <a href="/login" className="text-link-bd-btom hover-up">Login</a>
//         </div>
//       </div>
//     );
//   };
  
//   export default HeaderRight;
  
  //className="text-link-bd-btom hover-up"
  //className="btn btn-default btn-shadow ml-40 hover-up"


  import React, { useEffect, useState } from "react";
  import axios from "axios"; // Import axios for making HTTP requests
  
  const HeaderRight = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      // Check user authentication status by making an API call
      const checkAuth = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/validate-session", { withCredentials: true });
          if (response.status === 200) {
            setIsLoggedIn(true); // User is authenticated
          }
        } catch (error) {
          setIsLoggedIn(false); // User is not authenticated or token is invalid
        }
      };
  
      checkAuth();
    }, []); // Empty dependency array to run only on mount
  
    const handleLogout = () => {
      // Log out the user by calling the backend to clear the cookie
      axios.post("http://localhost:5000/api/v1/user/logout", {}, { withCredentials: true }) // Assuming you have a logout route
        .then(() => {
          setIsLoggedIn(false); // Update state after logout
          window.location.reload(); // Optionally reload the page
        })
        .catch((error) => {
          console.error("Logout failed", error);
        });
    };
  
    return (
      <div className="header-right">
        <div className="block-signin">
          {/* Conditionally render Login or Logout based on the authentication status */}
          {!isLoggedIn ? (
            <a href="/login" className="text-link-bd-btom hover-up">Login</a> // Show Login if not logged in
          ) : (
            <button onClick={handleLogout} className="text-link-bd-btom hover-up">Logout</button> // Show Logout if logged in
          )}
        </div>
      </div>
    );
  };
  
  export default HeaderRight;
  