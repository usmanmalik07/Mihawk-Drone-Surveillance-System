import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './UserInfo.css';

const users = [
  { id: 1, name: 'John Doe', role: 'Admin', image: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Jane Smith', role: 'Manager', image: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Alice Johnson', role: 'Developer', image: 'https://via.placeholder.com/50' },
  { id: 4, name: 'Bob Brown', role: 'Designer', image: 'https://via.placeholder.com/50' },
  { id: 5, name: 'Hozefa', role: 'MERN Stack Dev', image: 'https://via.placeholder.com/50' },
  { id: 6, name: 'Usman', role: 'Office boy', image: 'https://via.placeholder.com/50' },
];

// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#2e3b4e', // Modal background
  border: '3px solid #1e2a38', // Darker border
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  color: '#C72F48',
};

const UserInfo = () => {
  const [open, setOpen] = useState(false); // Modal visibility state for user info
  const [createOpen, setCreateOpen] = useState(false); // Modal visibility state for "Create User"
  const [selectedUser, setSelectedUser] = useState(null); // Selected user state

  // Open user info modal
  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  // Close user info modal
  const handleClose = () => setOpen(false);

  // Open "Create User" modal
  const handleCreateOpen = () => setCreateOpen(true);

  // Close "Create User" modal
  const handleCreateClose = () => setCreateOpen(false);

  return (
    <div style={{ padding: '95px 0 0', margin: '0 5vw' }}>
      {/* Search Bar and Create User Button */}
      <div className="flex items-center justify-between mb-4">
        <SearchBar />
        <button
          className="bg-[#C72F48] text-white px-4 py-2 rounded hover:bg-[#a12237] transition"
          onClick={handleCreateOpen} // Open "Create User" modal
        >
          Create User +
        </button>
      </div>

      {/* User List */}
      <div className="user-list-container mt-6 shadow-md rounded-lg py-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between border-b last:border-none py-4 hover:bg-[#2e3b4e] transition-all cursor-pointer px-4"
            onClick={() => handleOpen(user)} // Open modal on click
          >
            <div className="flex items-center">
              {/* User Image */}
              <img
                src={user.image}
                alt={`${user.name}`}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              {/* User Details */}
              <div>
                <h2 className="text-lg font-bold text-[#C72F48]">{user.name}</h2>
                <p className="text-sm text-gray-300">{user.role}</p>
              </div>
            </div>
            {/* Chevron Arrow */}
            <div className="text-gray-400 text-2xl">
              <span>&#8250;</span>
            </div>
          </div>
        ))}
      </div>

      {/* User Info Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="user-info-modal">
        <Box sx={modalStyle}>
          {selectedUser && (
            <>
              <div className="flex items-center mb-4">
                {/* User Image */}
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                {/* User Name and Role */}
                <div>
                  <Typography variant="h6" component="h2" className="">
                    <p className="text-[#C72F48] font-semibold">{selectedUser.name}</p>
                  </Typography>
                  <Typography className="text-gray-300">{selectedUser.role}</Typography>
                </div>
              </div>
              {/* Additional User Info */}
              <Typography variant="body2" sx={{ mt: 2 }} className="text-gray-300">
                More details about{' '}
                <span className="text-[#C72F48] font-semibold">
                  {selectedUser.name}
                </span>{' '}
                can go here. Customize this content as needed.
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* Create User Modal */}
      <Modal open={createOpen} onClose={handleCreateClose} aria-labelledby="create-user-modal">
        <Box sx={modalStyle}>
          <p variant="h6" component="h2" className="text-[#C72F48] font-semibold mb-2 text-2xl">
            Create New User
          </p>
          <Typography variant="body2" className="text-gray-300 mb-4">
            Add details for the new user here.
          </Typography>
          {/* Placeholder content for user creation */}
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <input
              type="text"
              placeholder="Role"
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <button
              className="bg-[#C72F48] text-white px-4 py-2 rounded hover:bg-[#a12237] transition w-full"
              onClick={handleCreateClose} // Close modal after creating user
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UserInfo;
