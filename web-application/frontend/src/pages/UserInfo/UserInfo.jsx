import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './UserInfo.css'; // Import the CSS file for styling

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
  const [users, setUsers] = useState([]); // User list state
  const [selectedUser, setSelectedUser] = useState(null); // Selected user state for info
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin', // Default role
  });
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [errorMessage, setErrorMessage] = useState(''); // Error message for form submission
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Base API URL
  const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/users`);
      if (!response.ok) throw new Error('Failed to fetch users.');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage('Error fetching users.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open Create User modal
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);

  // Open User Info modal
  const handleOpen = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Handle form submission for updating user
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${BASE_URL}/api/users/${selectedUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
        setFormData({ name: '', email: '', password: '', role: 'admin' });
        handleClose();
        alert('User updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setErrorMessage(errorData.message || 'Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Error updating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete user
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/users/${selectedUser._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUsers(users.filter((user) => user._id !== selectedUser._id));
          setFormData({ name: '', email: '', password: '', role: 'admin' });
          handleClose();
          alert('User deleted successfully!');
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData);
          setErrorMessage(errorData.message || 'Failed to delete user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setErrorMessage('Error deleting user. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle form submission for creating a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers([...users, newUser]);
        setFormData({ name: '', email: '', password: '', role: 'admin' });
        handleCreateClose();
        alert('User created successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setErrorMessage(errorData.message || 'Failed to create user.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Error creating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '95px 0 0', margin: '0 5vw' }}>
      {/* Search Bar and Create User Button */}
      <div className="flex items-center justify-between mb-4">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <button
          className="bg-[#C72F48] text-white px-4 py-2 rounded hover:bg-[#a12237] transition"
          onClick={handleCreateOpen}
        >
          Create New User
        </button>
      </div>

      {/* List of users */}
      <div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id || user.id} // Fallback to 'id' for static data or '_id' for dynamic API data
              className="user-item p-4 border-b border-gray-700 cursor-pointer flex items-center user-info-card"
              onClick={() => handleOpen(user)}
            >
              {/* User Image */}
              <img
                src={user.image || 'https://via.placeholder.com/50'}
                alt={user.name}
                className="w-16 h-16 rounded-full mr-6"
              />
              {/* User Info */}
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-300 mt-1">Role: {user.role}</p>
              </div>
            </div>
          ))
        )}
        {errorMessage && <div className="error-message text-red-500">{errorMessage}</div>}
      </div>

      {/* Create User Modal */}
      <Modal open={createOpen} onClose={handleCreateClose} aria-labelledby="create-user-modal">
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" className="text-[#C72F48] font-semibold mb-2 text-2xl">
            Create New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
            >
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="observer">Observer</option>
            </select>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#C72F48] text-white px-4 py-2 rounded hover:bg-[#a12237] transition"
              >
                Create User
              </button>
              <button
                type="button"
                onClick={handleCreateClose}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Edit User Modal */}
      <Modal open={open} onClose={handleClose} aria-labelledby="edit-user-modal">
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" className="text-[#C72F48] font-semibold mb-2 text-2xl">
            Edit User
          </Typography>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-3 border rounded"
            >
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="observer">Observer</option>
            </select>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#C72F48] text-white px-4 py-2 rounded hover:bg-[#a12237] transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
              >
                Delete User
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UserInfo;
