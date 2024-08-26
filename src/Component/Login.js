import React, { useState, useContext } from "react";
import axios from "axios";
import './Auth.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { type } from "@testing-library/user-event/dist/type";

function Login({ setActiveComponent, onLogin }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        // type: ''
    });

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            // const url = loginData.type === 'user' ? 'http://localhost:3000/user/signin' : 'http://localhost:3000/admin/signin';
            const response = await axios.post('http://localhost:3000/user/signin', loginData);
            alert('Login successful!');
            setUser(response.data.user);
            onLogin();
            navigate("/");
        } catch (err) {
            console.error(err);
            alert('Login failed.');
        }

    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLoginSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email address or phone number"
                    onChange={handleLoginChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                    required
                />
                {/* <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={handleLoginChange}
                    required
                >
                    <option value="" disabled selected>Select type</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select> */}

                <button type="submit" className="auth-button">Log in</button>
                <a href="#" className="switch-link" onClick={() => setActiveComponent('forget')}>Forgotten password?</a>
                <hr />
                <button type="button" className="create-account-button" onClick={() => setActiveComponent('register')}>
                    Create new account
                </button>
            </form>
        </div>
    );
}

export default Login;