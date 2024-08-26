import React, { useState } from "react";
import Registration from "./Signup";
import Login from "./Login";
import Forget from "./Forgetpaswor";
import './Logincss.css';

function Home({ onLogin }) {
    const [activeComponent, setActiveComponent] = useState('login');

    return (
        <>
            <div>
                <div className="home-page-content ">
                    <div className="auth-section">
                        {activeComponent === 'register' && <Registration setActiveComponent={setActiveComponent} />}
                        {activeComponent === 'login' && <Login setActiveComponent={setActiveComponent} onLogin={onLogin} />}
                        {activeComponent === 'forget' && <Forget setActiveComponent={setActiveComponent} />}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
