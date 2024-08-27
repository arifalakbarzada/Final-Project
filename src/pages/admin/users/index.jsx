import React, { useEffect, useState } from 'react';
import { usersApi } from '../../../service/base';
import { useDispatch } from 'react-redux';


const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    usersApi.getAllUsers().then(res=>setUsers(res))
  }, [dispatch])
  

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map(user => (
            <tr key={user.id}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td className={user.status === 'Active' ? 'active-label' : 'banned-label'}>{user.status === 'Active' ? 'Active' : 'Banned'}</td>
              <td>
                {user.status === 'Active' ? (
                  <button className="ban-button" onClick={() => usersApi.changeUserStatus(user.id , user , 'Banned')}>Ban</button>
                ) : (
                  <button className="active-button" onClick={()=>{
                    usersApi.changeUserStatus(user.id , user , 'Active')
                  }}>Active</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
