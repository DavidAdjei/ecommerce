import React, { useState } from 'react';
import UserInput from '../../features/UserInput';
import Logo from '../../assets/images/Logo.jpeg'



export default function SignUp() {
    const [name, setUsername] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password) {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        } else {
            console.log('signing up');
        }
    };

    return (
        <div className='auth'>
            <div className='auth_container'>
                <div className='auth_image'>
                    <img src={Logo} alt="authImage" />
                </div>
                <form onSubmit={handleSubmit} className='form'>
                    <UserInput
                        type="text"
                        value={name}
                        name="name"
                        placeholder="Enter Your Username"
                        setValue={setUsername}
                        error={error}
                    />
                    <UserInput
                        type="email"
                        value={email}
                        name="email"
                        placeholder="Enter Your Email"
                        setValue={setEmail}
                        error={error}
                    />
                    <UserInput
                        type="password"
                        value={password}
                        name="password"
                        placeholder="Enter Your Password"
                        setValue={setPassword}
                        error={error}
                    />
                    <input type="submit" disabled={loading} className='auth_submit' />
                    {error && <p className='error'>{error}</p>}
                </form>
            </div>
        </div>
        
    );
}
