import React, { useState } from 'react';
import UserInput from '../../features/UserInput';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import "./auth.css";
import Logo from "../../assets/images/Logo.jpeg"


export default function Login() {
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        } else {
            login(email, password, setLoading, navigate, setError);
        }

        
    };

    return (
        <div className="auth">
            <div className='auth_container'>
                <div className='auth_image'>
                    <img src={Logo} alt="authImage" />
                </div>
                <form onSubmit={handleSubmit} className='form'>
                    <UserInput
                        type="email"
                        value={email}
                        name="email"
                        placeholder="Enter Your Email"
                        setValue={setEmail}
                    />
                    <UserInput
                        type="password"
                        value={password}
                        name="password"
                        placeholder="Enter Your Password"
                        setValue={setPassword}
                    />
                    <input type="submit" disabled={loading} className='auth_submit'/>
                    {error && <p className='error'>{error}</p>}
                </form>
            </div>
        </div>
        
    );
}
