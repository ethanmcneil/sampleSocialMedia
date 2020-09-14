import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router'


const Login = withRouter(({ history }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const url = "http://localhost:8080"

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            username: username,
            password: password
        }
        const options = {
            headers: {
                'username': user.username,
                'password': user.password
             }
          };

        let response = await axios.post(`${url}/login`, user, options);
        
        if(response.status === 200){        
            // Need to store jwt in localstorage
            localStorage.setItem('coolbeans', response.headers.authorization);
            localStorage.setItem('user', user.username);
            window.alert("You're logged in!");
            history.push('/profile');
            window.location.reload(false);
        }
        else{
            window.alert("Something went wrong. Try again.");
            history.push('/login')
        }
    };

    return (
        <div>
            <h3>Please Login</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder="Enter username" type="text" value={username} onChange={e => setUsername(e.target.value)} /> 
                <input placeholder="Enter password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              <button className="btn" >Login</button>
            </form>
        </div>

    )
})

export default withRouter(Login);