import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signin } from "../../redux/Actions/authActions";
import UserInput from "../../features/UserInput";
import Logo from "../../assets/images/Logo.jpeg";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login({signin}) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    } else {
      signin(credentials).then(() => page ? navigate(`/${page}`) : navigate('/')).catch(err => setError(err));    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  return (
    <div className="auth">
      <div className="auth_container">
        <div className="auth_image">
          <img src={Logo} alt="authImage" />
        </div>
        <form onSubmit={handleSubmit} className="form">
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
          <input type="submit" disabled={loading} className="auth_submit" />
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
}


Login.propTypes = {
  signin: PropTypes.func
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, {signin})(Login)