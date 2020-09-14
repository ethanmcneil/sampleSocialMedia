import React, { useState } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router'


const Signup = withRouter(({ history }) => {

    const [webName, setWebname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const url = "http://localhost:8080/user"

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = {
            username: username,
            password: password,
            webName: webName
        }
        let response = await axios.post(`${url}/register`, user);
        console.log(response.status);
        history.push('/login')
    };

    return (
        <div>
                        <h3>Let's Register To Get Started!</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <input type="text" name="webName" value={webName} onChange={e => setWebname(e.target.value)} placeholder="Webname" />
                <button className="btn" >Register</button>
            </form>
        </div>
    )
})

export default Signup;