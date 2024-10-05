import React, { useEffect } from 'react';
import { usersApi } from '../../../service/base';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserStatus, setUsers } from '../../../redux/slices/userSlice';


const UserManagement = () => {
  const reduxUsers = useSelector((state) => state.users.items)
  const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
  const dispatch = useDispatch();
  useEffect(() => {
    usersApi.getAllUsers().then(res => dispatch(setUsers(res)))
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
          {reduxUsers?.map(user => (
            <tr key={user.id}>
              <td>{user.userName} {user.userName === JSON.parse(storedUser).userName ? '(You)' : ''} {user.role === 'admin' ? '(Admin)' : null}</td>
              <td>{user.email}</td>
              <td className={user.status === 'Active' ? 'active-label' : 'banned-label'}>{user.status === 'Active' ? 'Active' : 'Banned'}</td>
              <td>
                {user.status === 'Active' ? (
                  <button className={`ban-button ${user.userName === JSON.parse(storedUser).userName || user.role === 'admin' ? 'cannot-ban' : null}`} disabled={user.userName === JSON.parse(storedUser).userName || user.role === 'admin' ? true : false} onClick={() => {
                    usersApi.changeUserStatus(user.id, user, 'Banned')
                    dispatch(changeUserStatus({userData: user , status : 'Banned'}))
                  }}>Ban</button>
                ) : (
                  <button className="active-button" onClick={() => {
                    usersApi.changeUserStatus(user.id, user, 'Active')
                    dispatch(changeUserStatus({userData: user , status : 'Active'}))
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
