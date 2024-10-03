import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserInput from '../../features/UserInput';
import Logo from '../../assets/images/Logo.jpeg'
import "../LogIn/auth.css"
import { signUp } from '../../redux/Actions/authActions';
import { useNavigate } from 'react-router-dom';
import { setFeedback } from '../../redux/Actions/productActions';
import getGoogleLink from '../../features/util';
import { FcGoogle } from 'react-icons/fc';


function SignUp({signUp, setFeedback}) {
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials)
        setLoading(true);

        if (!credentials.firstName || !credentials.lastName || !credentials.email || !credentials.password || !credentials.confirmPassword) {
            setFeedback({error: 'Please fill in all fields'});
            setLoading(false);
            return;
        } else {
            signUp(credentials).then(() => navigate('/login')).catch(err => { setFeedback({ error: err });  setLoading(false)});
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    return (
        <div className='auth'>
            <div className='auth_container'>
                <div className='auth_image'>
                    <img src={Logo} alt="authImage" />
                </div>
                <form onSubmit={handleSubmit} className='form'>
                    <UserInput
                        type="text"
                        value={credentials.firstName}
                        name="firstName"
                        placeholder="Enter Your First Name"
                        setValue={handleChange}
                    />
                    <UserInput
                        type="text"
                        value={credentials.lastName}
                        name="lastName"
                        placeholder="Enter Your Last Name"
                        setValue={handleChange}
                    />
                    <UserInput
                        type="email"
                        value={credentials.email}
                        name="email"
                        placeholder="Enter Your Email"
                        setValue={handleChange}
                    />
                    <UserInput
                        type="password"
                        value={credentials.password}
                        name="password"
                        placeholder="Enter Your Password"
                        setValue={handleChange}
                    />
                    <UserInput
                        type="password"
                        value={credentials.confirmPassword}
                        name="confirmPassword"
                        placeholder="Confirm Your Password"
                        setValue={handleChange}
                    />
                    <input type="submit" disabled={loading} className='auth_submit' />
                </form>
                <div className="login-actions">
                    <p>Or Continue With</p>
                    <hr />
                    <button
                        className="google-btn"
                        onClick={() => {
                        window.location.href = getGoogleLink();
                        }}
                    >
                        <FcGoogle />
                        <p>Google</p>
                    </button>
                </div>
            </div>
        </div>
        
    );
}

SignUp.propTypes = {
  signUp: PropTypes.func,
  setFeedback: PropTypes.func
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps, {signUp, setFeedback})(SignUp)