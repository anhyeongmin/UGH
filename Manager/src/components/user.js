import React from 'react';

const User = () => {
  const users = [
    { id: 1, name: 'User1', role: 'Admin' },
    { id: 2, name: 'User2', role: 'Editor' },
    { id: 3, name: 'User3', role: 'Viewer' }
  ];

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
