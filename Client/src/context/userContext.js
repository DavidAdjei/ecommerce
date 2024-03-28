import React, { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL ="https://ecommerce-server-ecru.vercel.app"
axios.defaults.withCredentials = true;
const UserContext = createContext();


export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }) => {    
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);

     useEffect(() => {
        const fetchUsers = () => {
            axios.get("/users")
                .then(response => {
                    setUsers(response.data.users);
                    console.log(response.data.users)
                })
                .catch(error => {
                    console.error("Error fetching products:", error);
                });
        }

        fetchUsers();
    }, []);

    const login =(email, password, setLoading, setError) => {
            axios.post(`/signin`, {
                email,
                password,
            }).then((response) => {
                if (!response.data.error) {
                setLoading(false);
                console.log("Log In successful");
                alert('Log In successful');
                navigate(-1);
                setUser(response.data.user);
                } else {
                    setError(response.data.error);
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err);
                setError('An error occurred while logging in. Please try again later.');
                setLoading(false);
            })
    }
    
    const signin = (name, email, password, setLoading, setError) => {
        axios.post(`/signUp`, {
                name,
                email,
                password,
            }).then(response => {
               if (!response.data.error) {
                setLoading(false);
                console.log("Sign up successful");
                alert('Sign Up successful');
                navigate(-1)
                setUser(response.data.user);
                } else {
                    setError(response.data.error);
                    setLoading(false);
                } 
            }).catch(err => {
                console.log(err);
                setError('An error occurred while signing up. Please try again later.');
                setLoading(false);
            }
        )
    }

    

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, signin, logout, users }} >
            {children}
        </UserContext.Provider>
    )
}
