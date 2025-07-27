import React from 'react';

function AuthForm({ email, setEmail, password, setPassword, handleLogin, handleSignUp }) {
    return (
        <div>
            <h3>QuickNotes</h3>
            <input 
                id="email"
                name="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
            />
            <input
                id="password"
                name="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" 
            />

            <div className="d-flex flex-row">
                <button onClick={handleLogin}>Log In</button>
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    );
}

export default AuthForm;