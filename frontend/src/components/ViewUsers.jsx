// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';

// const ViewUsers = ({ users }) => {
//   if (!Array.isArray(users)) {
//     // Add a fallback in case `users` is not an array
//     return (
//       <div>
//         <Typography variant="h5">View Users</Typography>
//         <Typography variant="body2" color="error">
//           No users available or failed to load data.
//         </Typography>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Typography variant="h5">View Users</Typography>
//       <Grid container spacing={2}>
//         {users.map((user) => (
//           <Grid item xs={12} sm={6} md={4} key={user._id}>
//             <Paper sx={{ padding: 2 }}>
//               <Typography variant="h6">{user.fullname}</Typography>
//               <Typography variant="body2">{user.email}</Typography>
//               <Typography variant="body2">{user.phoneNumber}</Typography>
//               {/* Add more user details here if needed */}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default ViewUsers;


import React, { useState } from 'react';
import { Grid, Paper, Typography, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const ViewUsers = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  // Calculate the index of the last user on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  // Calculate the index of the first user on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Slice the users array to get the users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Function to go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!Array.isArray(users)) {
    // Add a fallback in case `users` is not an array
    return (
      <div>
        <Typography variant="h5">View Users</Typography>
        <Typography variant="body2" color="error">
          No users available or failed to load data.
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5">View Users</Typography>
      <Grid container spacing={2}>
        {currentUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6">{user.fullname}</Typography>
              <Typography variant="body2">{user.email}</Typography>
              <Typography variant="body2">{user.phoneNumber}</Typography>
              {/* Add more user details here if needed */}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Pagination controls with arrows and page number */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
        <IconButton 
          onClick={prevPage} 
          disabled={currentPage === 1}
          color="primary"
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="body2" sx={{ margin: '0 10px' }}>
          Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
        </Typography>

        <IconButton 
          onClick={nextPage} 
          disabled={currentPage === Math.ceil(users.length / usersPerPage)} 
          color="primary"
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default ViewUsers;
