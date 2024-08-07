import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { usersApi } from '../../../service/base';
import { setUsers } from '../../../redux/slices/userSlice';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { id , token} = useParams()
    const dispatch = useDispatch()
    const users = useSelector((state)=>state.users.items)
    useEffect(()=>{
        usersApi.getAllUsers().then(res=>dispatch(setUsers(res)))
    },[dispatch])
    const handleSubmit = (e) => {
        const user = users.find(user => user.token === token)
        e.preventDefault();
        if (password === confirmPassword && user) {
            usersApi.resetPassword(id , user , password)
            console.log('Passwords match. Proceed with reset.');
            console.log(token);
            
        } else {
            console.log('Passwords do not match.');
            console.log(token)
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="new-password">New Password *</label>
                    <input
                        type="password"
                        id="new-password"
                        name="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm New Password *</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
