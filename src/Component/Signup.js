import React, { useState } from "react";
import axios from "axios";
// import './Auth.css'

function Registration({ setActiveComponent }) {
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
        email: '',
        // type: ''
    });

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            // const url = registerData.type === 'admin' ? 'http://localhost:3000/admin/signup' : 'http://localhost:3000/user/signup';
            const response = await axios.post('http://localhost:3000/user/signup', registerData);
            console.log(response);
            alert('Registration successful!');
        } catch (err) {
            console.error(err);
            alert('Registration failed.');
        }
    };


    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleRegisterSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleRegisterChange}
                    required
                />
                {/* <select
                    className="form-select form-select-sm"
                    aria-label=".form-select-sm example"
                    onChange={handleRegisterChange}
                    required
                >
                    <option value="" disabled selected>Select type</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select> */}

                <button type="submit" className="auth-button">Sign Up</button>
                <hr />
                <button type="button" className="switch-link" onClick={() => setActiveComponent('login')}>
                    Already have an account? Log in
                </button>
            </form>
        </div>
    );
}

export default Registration;
