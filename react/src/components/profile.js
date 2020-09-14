import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router'



const Profile = withRouter(({history}) => {
    const [id, setId] = useState("");
    const [webName, setWebname] = useState("");
    const [username, setUsername] = useState("");
    const [newWebname, setNewWebname] = useState("");

    const url = "http://localhost:8080/user"

    useEffect(() => {
        // Need to send Headers
        let myHeaders = {
            authorization: `Bearer ${localStorage.getItem('coolbeans')}`,
            username: `${localStorage.getItem('user')}`
        }
        axios.get(`${url}/`, {headers: myHeaders})
        .then(response => {
            if(response.status === 200){
                setId(response.data.id);
                setWebname(response.data.webName);
                setUsername(response.data.username);
                document.getElementById("ifLoggedOut").classList.add("noShow");
                document.getElementById("profileDetails").classList.remove("noShow");
            }
        })
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        let myHeaders = {
            authorization: `Bearer ${localStorage.getItem('coolbeans')}`,
            webName: newWebname
        }
        axios.put(`${url}/${id}`, "", {headers: myHeaders});
        setWebname(newWebname);

    };
    function showUpdates() {
        document.getElementById("profileUpdate").classList.remove("noShow");
    }

    function deleteAccount() {
        let myHeaders = {
            authorization: `Bearer ${localStorage.getItem('coolbeans')}`
        }
        axios.delete(`${url}/${id}`, {headers: myHeaders});
        localStorage.clear();
        history.push('/');
    }

    return (
        <div>
            <div id="ifLoggedOut" >
                <h3>I'm sorry but you aren't logged! Please login first.</h3>
            </div>
            <div id="profileDetails" className="noShow">
                <h3>Your Profile</h3>
            <ul>
                <li>Username: {username}</li>
                <li>User ID: {id} </li>
                <li id="webName">Webname: {webName} </li>
            </ul>
            <button onClick={deleteAccount}>Delete Your Account</button>
            <button onClick={showUpdates}>Update Your Details</button>       
                <div id="profileUpdate" className="noShow">  
                <form onSubmit={handleSubmit}>
                    <input type="text" name="webName" value={newWebname} onChange={e => setNewWebname(e.target.value)} placeholder="New Webname" />
                    <button className="btn" >Updated</button>
                    </form>
                </div>
            </div>    
        </div>
    )
})

export default withRouter(Profile);