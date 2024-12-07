import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { usersApi } from '../../../service/base';
import { setUsers } from '../../../redux/slices/userSlice';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { id, token } = useParams();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.items);
    const user = users.find(user => user.token === token);

    useEffect(() => {
        usersApi.getAllUsers().then(res => dispatch(setUsers(res)));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword && user && validatePassword(password)) {
            usersApi.resetPassword(id, user, password);
            toast.success('Password is reset successfully.')
        } else {
            alert('Passwords do not match or invalid.');
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return regex.test(password);
    };

    return user ? (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
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
                <div className="input-group">
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
    ) : null;
};

export default ResetPassword;
